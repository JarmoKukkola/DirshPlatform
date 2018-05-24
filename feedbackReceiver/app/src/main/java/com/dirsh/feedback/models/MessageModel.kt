package com.dirsh.feedback.models

class MessageModel {
    var time: Long?=null
    var email: String?=null
    var topic: String?=null
    var content: String?=null

    constructor()

    constructor(time: Long, email: String, topic: String, content: String) {
        this.time = time
        this.email = email
        this.topic = topic
        this.content = content
    }
}
