package com.dirsh.feedback.utils

import android.app.Activity
import android.content.Intent

class ActivityUtil {
    companion object {
        fun goToActivity(activity:Activity, classType: Class<out Activity>, clear: Boolean) {
            val i = Intent(activity, classType)
            if (clear) {
                i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK)
            }
            activity.startActivity(i)
            activity.finish()
        }
    }
}