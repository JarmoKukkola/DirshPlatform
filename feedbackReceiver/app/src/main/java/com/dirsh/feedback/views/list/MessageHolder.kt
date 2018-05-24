package com.dirsh.feedback.views.list

import android.content.Context
import android.graphics.Color
import android.support.v7.widget.RecyclerView
import android.view.View
import android.widget.TextView
import com.dirsh.feedback.R
import com.dirsh.feedback.models.MessageModel
import com.dirsh.feedback.utils.DateUtil


class MessageHolder(v: View, private val messageHolderListener: MessageHolderListener) : RecyclerView.ViewHolder(v), View.OnLongClickListener, View.OnClickListener {

    private var view: View = v
    private var messageModel: MessageModel? = null
    private var key: String? = null
    private var messageType: Int? = null
    private var context: Context? = null

    init {
        v.setOnClickListener(this)
        v.setOnLongClickListener(this)
    }

    override fun onClick(v: View) {
        messageHolderListener.onClick(adapterPosition)
    }

    override fun onLongClick(v: View?): Boolean {
        messageHolderListener.onLongClick(adapterPosition)
        return true
    }

    fun bind(context: Context, messageModel: MessageModel, key: String, messageType: Int,selected:Boolean) {
        this.key = key
        this.context = context
        this.messageModel = messageModel
        this.messageType = messageType
        view.findViewById<TextView>(R.id.time).text = DateUtil.unixTimeToString(messageModel.time)
        view.findViewById<TextView>(R.id.topic).text = messageModel.topic
        if(selected){
            view.setBackgroundColor(Color.GRAY)
        } else {
            view.setBackgroundColor(Color.WHITE)
        }
    }
}