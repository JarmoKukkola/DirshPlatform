package com.dirsh.feedback.notification

import android.util.Log
import com.google.firebase.iid.FirebaseInstanceId
import com.google.firebase.iid.FirebaseInstanceIdService

class MyFirebaseInstanceIDService: FirebaseInstanceIdService() {
    private val TAG="FirebaseInstanceID"

    override fun onTokenRefresh() {
        val refreshedToken = FirebaseInstanceId.getInstance().token
        Log.d(TAG, "Refreshed token: " + refreshedToken!!)
        //use the token value on the server to send messages
    }

    companion object {
        fun logToken() { //used in websiteFunctions project to send push notifications to dev team
            val instance=FirebaseInstanceId.getInstance()
            if(instance!=null) {
                val token=instance.token
                if(token!=null){
                    Log.d("Token", token)
                }
            }
        }
    }

}