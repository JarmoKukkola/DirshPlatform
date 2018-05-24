package com.dirsh.feedback.utils

import java.text.SimpleDateFormat


class DateUtil {
    companion object {
        private val dt = SimpleDateFormat("dd/MM/yy HH:mm")

        fun unixTimeToString(unixTime: Long?): String {
            return dt.format(java.util.Date(unixTime!!))
        }
    }
}