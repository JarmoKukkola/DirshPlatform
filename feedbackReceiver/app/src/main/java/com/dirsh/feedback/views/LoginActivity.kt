package com.dirsh.feedback.views

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.view.View
import com.dirsh.feedback.R
import com.dirsh.feedback.notification.MyFirebaseInstanceIDService
import com.dirsh.feedback.utils.ActivityUtil
import com.dirsh.feedback.utils.FirebaseUtil
import com.dirsh.feedback.views.list.ListActivity
import com.firebase.ui.auth.AuthUI
import java.util.*

class LoginActivity : AppCompatActivity() {

    private val RC_SIGN_IN = 123
    private val TAG = "LoginActivity"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        MyFirebaseInstanceIDService.logToken() // use this on server to send notifications

        FirebaseUtil.initialize(this)
        if (FirebaseUtil.isLoggedIn()) {
            goToMessages()
        }
    }

    fun login(v: View)=
            startActivityForResult(
                    AuthUI.getInstance()
                            .createSignInIntentBuilder()
                            .setIsSmartLockEnabled(false, true)
                            .setAvailableProviders(Arrays.asList(
                                    AuthUI.IdpConfig.GoogleBuilder().build()))
                            .build(),
                    RC_SIGN_IN)

    private fun goToMessages() {
        ActivityUtil.goToActivity(this, ListActivity::class.java, true)
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == RC_SIGN_IN) {
            if (resultCode === Activity.RESULT_OK) {
                goToMessages()
            } else {
                Log.d(TAG, "Sign in error")
            }
        }
    }
}