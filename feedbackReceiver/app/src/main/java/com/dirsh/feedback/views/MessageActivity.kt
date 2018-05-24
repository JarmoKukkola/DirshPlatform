package com.dirsh.feedback.views

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.support.design.widget.FloatingActionButton
import android.support.design.widget.TextInputEditText
import android.support.v7.app.AppCompatActivity
import android.view.Menu
import android.view.MenuItem
import com.dirsh.feedback.R
import com.dirsh.feedback.enums.Keys
import com.dirsh.feedback.enums.MessageType
import com.dirsh.feedback.utils.DateUtil
import com.dirsh.feedback.utils.FirebaseUtil
import com.dirsh.feedback.views.list.ListActivity

class MessageActivity : AppCompatActivity() {

    private var key: String? = null
    private var email: String? = null
    private var topic: String? = null
    private var content: String? = null
    private var time: Long? = null

    private lateinit var messageType: MessageType

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_message)
        val bundle = intent.extras
        key = getString(bundle, Keys.KEY)
        messageType = MessageType.values()[bundle.getInt(Keys.MESSAGE_TYPE.toString())]
        email = getString(bundle, Keys.EMAIL)
        topic = getString(bundle, Keys.TOPIC)
        content = getString(bundle, Keys.CONTENT)
        time = bundle.getLong(Keys.TIME.toString())

        setText(R.id.email, email)
        setText(R.id.topic, topic)
        setText(R.id.content, content)
        setText(R.id.time, DateUtil.unixTimeToString(time))

        setSupportActionBar(findViewById(R.id.my_toolbar))

        val fab = findViewById<FloatingActionButton>(R.id.fab)
        fab.setOnClickListener({ _ ->
            val intent = Intent(Intent.ACTION_SENDTO)
            intent.data = Uri.parse("mailto:") // only email apps should handle this
            intent.putExtra(Intent.EXTRA_EMAIL, arrayOf(email))
            intent.putExtra(Intent.EXTRA_SUBJECT, "Re: $topic")
            intent.putExtra(Intent.EXTRA_TEXT, "\n\n\n\n\nThe above is a reply to your earlier message:\n\n$content")
            if (intent.resolveActivity(packageManager) != null) {
                startActivity(intent)
            }
        })
    }

    private fun getString(bundle: Bundle, key: Keys) = bundle.getString(key.toString())

    private fun setText(id: Int, text: String?) {
        findViewById<TextInputEditText>(id).setText(text)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        val inflater = menuInflater
        inflater.inflate(R.menu.main_menu, menu)
        menu.findItem(R.id.action_restore).isVisible = messageType != MessageType.Inbox
        menu.findItem(R.id.action_archive).isVisible = messageType == MessageType.Inbox
        menu.findItem(R.id.action_delete).isVisible = messageType == MessageType.Inbox
        menu.findItem(R.id.action_delete_forever).isVisible = messageType == MessageType.Trash
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem) = when (item.itemId) {
        R.id.action_restore -> {
            moveMessage(MessageType.Inbox)
            true
        }

        R.id.action_archive -> {
            moveMessage(MessageType.Archived)
            true
        }

        R.id.action_delete -> {
            moveMessage(MessageType.Trash)
            true
        }
        R.id.action_delete_forever -> {
            moveMessage(null)
            true
        }

        else -> super.onOptionsItemSelected(item)
    }

    private fun moveMessage(destination: MessageType?) {
        FirebaseUtil.moveMessage(messageType, destination, key!!, email!!, topic!!, content!!, time!!)
        startActivity(Intent(this, ListActivity::class.java))
    }
}