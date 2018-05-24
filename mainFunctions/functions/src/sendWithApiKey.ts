import * as createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { DataSnapshot } from 'firebase-functions/lib/providers/database';

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

const keyRegex = /^[A-Za-z0-9]{30}$/
const accountRegex = /^[0-9a-zA-Z]{27}[0-9]$/
const typeRegex = /^[A-Za-z0-9]{3,20}$/

const transactionFee=0.099999;

//https://us-central1-dirsh-d6d60.cloudfunctions.net/send?key=a02b017a2ad20db78620779ad1bcc1&account=4P1kyicMxZSmuz7rFTvRvaPiirw1&receiver=CCCCCCCCCCCCCCCCCCCCCCCCCCC1&type=Dirsh&amount=100

export let run = (admin, req, res) => new Promise<void>((resolve) => {
    const key: string = DOMPurify.sanitize(req.query.key);
    console.log("key", key);
    const account: string = DOMPurify.sanitize(req.query.account);
    console.log("account", account);
    const receiver: string = DOMPurify.sanitize(req.query.receiver);
    console.log("receiver", receiver);
    const type: string = DOMPurify.sanitize(req.query.type);
    console.log("type", type);
    const amount: number = Number(DOMPurify.sanitize(req.query.amount));
    console.log("amount", amount);

    if (!keyRegex.test(key)) {
        res.status(400).send('Wrong key format');
        resolve();
    } else if (!accountRegex.test(account)) {
        res.status(400).send('Wrong account format');
        resolve();
    } else if (!accountRegex.test(receiver)) {
        res.status(400).send('Wrong receiver format');
        resolve();
    } else if (!typeRegex.test(type)) {
        res.status(400).send('Wrong type format');
        resolve();
    } else if (isNaN(amount)) {
        res.status(400).send('Amount is not a number');
        resolve();
    } else if (amount < 1) {
        res.status(400).send('Too low amount to send');
        resolve();
    }

    return admin
        .database()
        .ref('users/' + account + '/balances').once('value').then(function (snapshot: DataSnapshot) {
            const updates = {};
            updates['users/' + account + '/pendingSent'] = null;
            updates['users/' + account + '/latestCouponId'] = null;
            updates['users/' + account + '/latestTokenType'] = null;
            updates['users/' + account + '/processingReceivedId'] = null;
            const tokenBalance = snapshot.child(type).val();
            const dirshBalance = snapshot.child('Dirsh').val();
            if (type === 'Dirsh') {
                if (tokenBalance < transactionFee + amount) {
                    res.status(400).send('Insufficient Dirsh balance');
                    resolve();
                }
            } else {
                if (dirshBalance < transactionFee*5) {
                    res.status(400).send('Insufficient Dirsh balance');
                    resolve();
                }
                if (tokenBalance < amount) {
                    res.status(400).send('Insufficient ' + type + ' balance');
                    resolve();
                }
            }
            const transactionDb = {
                tokenType: type,
                amount: amount,
                time: admin.database.ServerValue.TIMESTAMP
            };

            const id = admin.database().ref('/').push().key;
            updates['users/' + receiver + '/pendingReceived/' + id] = transactionDb;

            updates['users/' + account + '/pendingSent'] = {
                id: id,
                tokenType: type,
                amount: amount,
                receiverAddress: receiver
            };
            if (type === 'Dirsh') {
                updates['users/' + account + '/balances/' + type] = tokenBalance - amount - transactionFee;
            } else {
                updates['users/' + account + '/balances/' + type] = tokenBalance - amount;
                updates['users/' + account + '/balances/Dirsh'] = dirshBalance - transactionFee*5;
            }
            const sentDb = {
                tokenType: type,
                amount: amount,
                receiverAddress: receiver,
                time: admin.database.ServerValue.TIMESTAMP
            };
            updates['users/' + account + '/sent/' + id] = sentDb;
            updates['burned/sent/' + id] =
                type === 'Dirsh'
                    ? transactionFee
                    : transactionFee*5;
            updates['sendApi']={
                sender:account,
                receiver:receiver,
                id:id,
                apiKey:key
            };
            console.log(updates);
            return admin.database().ref('/').update(updates)
                .then(function (response) {
                    res.status(200).send('Sent '+amount+" "+type+' from '+account+' to '+receiver);
                    resolve();
                }, function (error) {
                    res.status(400).send(error);
                    resolve();
                });;
        });
});