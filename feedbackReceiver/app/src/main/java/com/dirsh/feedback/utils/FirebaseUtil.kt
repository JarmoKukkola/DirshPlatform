package com.dirsh.feedback.utils

import android.content.Context
import android.support.v4.app.FragmentActivity
import com.dirsh.feedback.enums.MessageType
import com.dirsh.feedback.models.MessageModel
import com.dirsh.feedback.views.LoginActivity
import com.firebase.ui.auth.AuthUI
import com.google.firebase.FirebaseApp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.Query

class FirebaseUtil {

    companion object {
        fun initialize(context: Context) = FirebaseApp.initializeApp(context)

        fun isLoggedIn() = getCurrentUser() != null

        private fun getCurrentUser() = FirebaseAuth.getInstance().currentUser

        fun getUid(): String? {
            val user = getCurrentUser()
            if (user != null) {
                return user.uid
            }
            return null
        }

        fun moveMessage(origin: MessageType, destination: MessageType?, key: String, email: String, topic: String, content: String, time: Long) {
            val messages = HashMap<String, MessageModel>()
            messages[key] = MessageModel(time, email, topic, content)
            moveMessages(origin, destination, messages)
        }

        private fun getInstance() = FirebaseDatabase.getInstance()
        fun getRef(title: String): Query = getInstance().getReference(title)
        fun logout(context: Context, activity: FragmentActivity?) {
            AuthUI.getInstance()
                    .signOut(context)
                    .addOnCompleteListener {
                        ActivityUtil.goToActivity(activity!!, LoginActivity::class.java, true)
                    }
        }

        fun moveMessages(origin: MessageType, destination: MessageType?, messages: HashMap<String, MessageModel>) {
            val childUpdates = HashMap<String, Any?>()
            for ((key, value) in messages) {
                childUpdates["/" + origin.toString() + "/" + key] = null
                if (destination != null) {
                    childUpdates["/" + destination.toString() + "/" + key] = value
                }
            }
            getInstance().reference.updateChildren(childUpdates)
        }
    }
}