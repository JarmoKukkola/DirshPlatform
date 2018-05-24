import * as crypto from "crypto";
import * as admin from 'firebase-admin';

export function randomPath():string{
        return admin
            .database()
            .ref('/')
            .push()
            .key + crypto
            .randomBytes(5)
            .toString('hex');
}