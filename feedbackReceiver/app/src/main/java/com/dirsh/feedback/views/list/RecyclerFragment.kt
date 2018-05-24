package com.dirsh.feedback.views.list

import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.view.*
import com.dirsh.feedback.R
import com.dirsh.feedback.enums.Keys
import com.dirsh.feedback.enums.MessageType
import com.dirsh.feedback.models.MessageModel
import com.dirsh.feedback.utils.FirebaseUtil
import com.dirsh.feedback.views.MessageActivity
import com.firebase.ui.database.FirebaseRecyclerAdapter
import com.firebase.ui.database.FirebaseRecyclerOptions
import com.google.firebase.database.Query

class RecyclerFragment : Fragment() {

    private var logoutButton: MenuItem? = null
    private var cancelButton: MenuItem? = null
    private var restoreButton: MenuItem? = null
    private var archiveButton: MenuItem? = null
    private var deleteButton: MenuItem? = null
    private var deleteForeverButton: MenuItem? = null

    override fun onCreateOptionsMenu(menu: Menu, inflater: MenuInflater) {
        inflater.inflate(R.menu.main_menu, menu)
        logoutButton = menu.findItem(R.id.action_logout)
        logoutButton?.isVisible = true
        cancelButton = menu.findItem(R.id.action_cancel)
        restoreButton = menu.findItem(R.id.action_restore)
        archiveButton = menu.findItem(R.id.action_archive)
        deleteButton = menu.findItem(R.id.action_delete)
        deleteForeverButton = menu.findItem(R.id.action_delete_forever)
    }

    private fun setButtons() {
        logoutButton?.isVisible = !isMultiSelectOn
        cancelButton?.isVisible = isMultiSelectOn
        restoreButton?.isVisible = isMultiSelectOn && messageType != MessageType.Inbox
        archiveButton?.isVisible = isMultiSelectOn && messageType == MessageType.Inbox
        deleteButton?.isVisible = isMultiSelectOn && messageType == MessageType.Inbox
        deleteForeverButton?.isVisible = isMultiSelectOn && messageType == MessageType.Trash
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when (item.itemId) {
            R.id.action_logout -> FirebaseUtil.logout(context!!, activity)
            R.id.action_cancel -> deselectAll()
            R.id.action_restore -> {
                moveMessages(MessageType.Inbox)
            }
            R.id.action_archive -> {
                moveMessages(MessageType.Archived)
            }
            R.id.action_delete -> {
                moveMessages(MessageType.Trash)
            }
            R.id.action_delete_forever -> {
                moveMessages(null)
            }
            else -> super.onOptionsItemSelected(item)
        }
        return true
    }

    private fun moveMessages(destination: MessageType?){
        FirebaseUtil.moveMessages(messageType, destination, selectedMessages)
        deselectAll()
    }

    private lateinit var messageType: MessageType

    private lateinit var firebaseRecyclerAdapter: FirebaseRecyclerAdapter<MessageModel, MessageHolder>

    companion object {
        fun newInstance(messageType: MessageType): RecyclerFragment {
            val f = RecyclerFragment()

            val args = Bundle()
            args.putInt(Keys.MESSAGE_TYPE.toString(), messageType.toInt())
            f.arguments = args

            return f
        }
    }

    fun deselectAll() {
        selectedMessages.clear()
        firebaseRecyclerAdapter.notifyDataSetChanged()
        isMultiSelectOn = false
        setButtons()
    }

    private var isMultiSelectOn: Boolean = false

    private val selectedMessages: HashMap<String,MessageModel> = HashMap()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        val v = inflater.inflate(R.layout.fragment_message_list, container, false) as View

        setHasOptionsMenu(true)

        messageType = MessageType.values()[arguments!!.getInt(Keys.MESSAGE_TYPE.toString())]

        val recyclerView = v.findViewById<RecyclerView>(R.id.recyclerView)

        val layoutManager = LinearLayoutManager(context)
        layoutManager.reverseLayout = true
        layoutManager.stackFromEnd = true
        recyclerView.layoutManager = layoutManager

        recyclerView.setHasFixedSize(true)

        val options = FirebaseRecyclerOptions.Builder<MessageModel>()
                .setQuery(getQuery(), MessageModel::class.java)
                .build()

        firebaseRecyclerAdapter = object : FirebaseRecyclerAdapter<MessageModel, MessageHolder>(options), MessageHolderListener {
            override fun onLongClick(index: Int) {
                changeMultiSelection(!isMultiSelectOn)
                if (isMultiSelectOn) {
                    select(index)
                } else {
                    deselectAll()
                }
            }

            private fun changeMultiSelection(activated: Boolean) {
                isMultiSelectOn = activated
                setButtons()
            }

            override fun getItemId(position: Int): Long {
                return getHash(position).toLong()
            }

            private fun getHash(index: Int): Int {
                return getItem(index).hashCode()
            }

            private fun select(index: Int) {
                val key = getRef(index).key
                if (selectedMessages.contains(key)) {
                    selectedMessages.remove(key)
                } else {
                    selectedMessages[key] = getItem(index)
                }
                notifyItemChanged(index)
                if (selectedMessages.size < 1) {
                    changeMultiSelection(false)
                }
            }

            override fun onClick(index: Int) {
                if (isMultiSelectOn) {
                    select(index)
                } else {
                    val bundle = Bundle()
                    val model = getItem(index)
                    bundle.putString(Keys.KEY.toString(), getRef(index).key)
                    bundle.putInt(Keys.MESSAGE_TYPE.toString(), messageType.toInt())
                    bundle.putString(Keys.EMAIL.toString(), model.email)
                    bundle.putString(Keys.TOPIC.toString(), model.topic)
                    bundle.putString(Keys.CONTENT.toString(), model.content)
                    bundle.putLong(Keys.TIME.toString(), model.time!!)
                    val i = Intent(context, MessageActivity::class.java)
                    i.putExtras(bundle)
                    context!!.startActivity(i)
                }
            }

            override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MessageHolder
                    = MessageHolder(LayoutInflater.from(parent.context).inflate(R.layout.list_item, parent, false) as View, this)

            override fun onBindViewHolder(holder: MessageHolder, position: Int, model: MessageModel) = holder.bind(context!!, model, getRef(position).key, messageType.toInt(), selectedMessages.contains(getRef(position).key))
        }
        firebaseRecyclerAdapter.setHasStableIds(true)

        recyclerView.adapter = firebaseRecyclerAdapter

        return v
    }

    override fun onResume() {
        super.onResume()
        firebaseRecyclerAdapter.startListening()
    }

    override fun onPause() {
        super.onPause()
        firebaseRecyclerAdapter.stopListening()
    }

    private fun getQuery(): Query {
        val query = FirebaseUtil.getRef(messageType.toString())
        if (messageType == MessageType.Inbox) {
            return query.limitToLast(10)
        }
        return query
    }
}