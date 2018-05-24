package com.dirsh.feedback.enums

enum class MessageType {
    Inbox,
    Archived,
    Trash;

    fun toInt(): Int {
        return this.ordinal
    }
}