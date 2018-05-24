import * as rp from 'request-promise';
import * as createDOMPurify from 'dompurify';
import {JSDOM} from 'jsdom';

const recaptchaAccount = require("./recaptcha.json");

const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

export let run = (admin,req,res) => new Promise < void > ((resolve) => {
    const recaptcha = req.query.recaptcha;
        const type = DOMPurify.sanitize(req.query.type);
        const recaptchaSecret=recaptchaAccount.secret;
        // console.log("recaptcha response", recaptcha);
        // console.log("recaptcha secret", recaptchaSecret);
        // console.log("recaptcha type", type);

        rp({
            uri: 'https://recaptcha.google.com/recaptcha/api/siteverify',
            method: 'POST',
            formData: {
                secret: recaptchaSecret,
                response: DOMPurify.sanitize(recaptcha)
            },
            json: true
        }).then(result => {
            const domain = 'https://dirsh.com/';
            if (result.success) {
                if (type === 'airdrop') {
                    // reclaim airdrop gift cards
                    const password:string = DOMPurify.sanitize(req.query.p);
                    if (password&&password.length===30) {
                        admin
                            .database()
                            .ref('distribution')
                            .once("value", function (snapshot) {
                                const val = snapshot.val();
                                if (val.latest && val.latest.id && val.giftCard && val.giftCard[val.latest.id] && val.latest.password && val.latest.password === password) {
                                    const address = domain + 'giftcard?id=' + val.latest.id;
                                    // console.log(address);
                                    res.redirect(address);
                                    resolve();
                                } else {
                                    res.redirect(domain + 'giftcard-used');
                                    resolve();
                                }
                            });
                    } else {
                        res.send('False query');
                        resolve();
                    }
                }else{
                    res.send('False query');
                    resolve();
                }
            } else {
                res.send("Recaptcha failed.")
                resolve();
            }
        }).catch(reason => {
            // console.log("Recaptcha request failure", reason)
            res.send("Recaptcha request failed.")
            resolve();
        })
});