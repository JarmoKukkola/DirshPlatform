import * as functions from 'firebase-functions';
import * as  admin from 'firebase-admin';
import * as rp from 'request-promise';
import * as createDOMPurify from 'dompurify';
import {JSDOM} from 'jsdom';
const recaptchaSecretJSON = require('./recaptcha.json'); //reCATPCHA secret
const registrationTokenJSON = require('./registrationToken.json'); //push notification reqistration token from feedbackReceiver app
const domain = 'https://dirsh.com/';

// log unhandled errors
process.on('unhandledRejection', (reason, promise) => {console.log('Unhandled Rejection at:', reason.stack || reason)});

const options = JSON.parse(process.env.FIREBASE_CONFIG);
options['databaseAuthVariableOverride'] = {
    uid: "my-service-worker"
}
admin.initializeApp(options);

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

exports.checkRecaptcha = functions
    .https
    .onRequest((req, res) => {
        return rp({
            uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
            method: 'POST',
            formData: {
                secret: recaptchaSecretJSON.secret,
                response: DOMPurify.sanitize(req.query.recaptcha)
            },
            json: true
        }).then(result => {
            if (result.success) {
                if (req.query.type === 'contact') {
                    // write contact form data to database
                    const email = DOMPurify.sanitize(req.query.e);
                    const topic = DOMPurify.sanitize(req.query.t);
                    const content = DOMPurify.sanitize(req.query.c);
                    if (email.length > 50 || topic.length > 50 || content.length > 300) {
                        return res.send('Failed to send message');
                    } else {
                        const value={time: admin.database.ServerValue.TIMESTAMP, topic: topic, content: content};
                        if(email&&email.length>0){
                            value['email']=email;
                        }
                        return admin
                            .database()
                            .ref('Inbox')
                            .push()
                            .set(value)
                            .then(() => {
                                const message = {
                                    notification: {
                                        title: topic,
                                        body: content
                                        
                                    },
                                    android: {
                                        notification: {
                                            sound: "default"
                                        }
                                    },
                                    apns: {
                                        payload: {
                                            aps: {
                                                sound: "default"
                                            }
                                        }
                                    },
                                    token: registrationTokenJSON.token
                                };

                                return admin
                                    .messaging()
                                    .send(message)
                                    .then((response) => {
                                        // Response is a message ID string.
                                        res.redirect(domain + 'message-send')
                                        return
                                    })
                                    .catch((error) => {
                                        console.log('Error sending message:', error);
                                        res.redirect(domain + 'message-failed')
                                        return
                                    });

                            });
                    }
                } else {
                    res.redirect(domain + 'message-failed')
                    return null;
                }
            } else {
                res.redirect(domain + 'message-failed')
                return null;
            }
        }).catch(reason => {
            console.log("ReCAPTCHA was not done correctly.", reason)
            res.redirect(domain + 'message-failed')
            return null;
        })
    })