import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
declare function require(moduleName: string): any;
import axios from 'axios';
import qs from 'qs';

@Injectable()
export class ElectronProvider {
  electron: any;
  verifier: string;

  getElectron(): any {
    if (!this.electron) {
      this.electron = require('electron');
    }
    return this.electron;
  }
  isElectron(): boolean {
    let userAgent = navigator.userAgent.toLowerCase();
    return userAgent.indexOf(' electron/') > -1;
  }

  quit(){
    this.getElectron().remote.getCurrentWindow().close();
  }

  clearStorage() {
    if (this.isElectron()) {
      //clear login data
      this.getElectron().remote.session.defaultSession.clearStorageData({}, () => { })
    }
  }

  GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
  GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me'
  GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'
  GOOGLE_CLIENT_ID = '950174752529-pm4soqmp8qsdu12qcef88nbcqhc71h7n.apps.googleusercontent.com'
  GOOGLE_CLIENT_SECRET = 'gxnPOqP7l3XnJ1lmQO4SrQ-V'
  GOOGLE_REDIRECT_URI = 'https://dirsh-d6d60.firebaseapp.com/__/auth/handler'

  signInWithPopup() {
    let that = this;
    return new Promise((resolve, reject) => {
      const electron = that.getElectron();
      const authWindow = new electron.remote.BrowserWindow({
        width: 500,
        height: 600,
        show: true,
      })

      // TODO: Generate and validate PKCE code_challenge value
      const crypto = require('crypto');
      this.verifier = crypto
        .randomBytes(64
        ).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');

      const urlParams = {
        response_type: 'code',
        redirect_uri: this.GOOGLE_REDIRECT_URI,
        client_id: this.GOOGLE_CLIENT_ID,
        scope: 'profile',
        max_auth_age: 0,
        code_challenge: this.verifier,
        prompt: 'select_account'
      }
      const authUrl = `${this.GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`

      function handleNavigation(url) {
        const parse = require('url').parse;
        const query = parse(url, true).query
        if (query) {
          if (query.error) {
            reject(new Error(`There was an error: ${query.error}`))
          } else if (query.code) {
            authWindow.removeAllListeners('closed')
            setImmediate(() => authWindow.close())
            resolve(query.code)
          }
        }
      }

      authWindow.on('closed', () => {
        throw new Error('Auth window was closed by user')
      })

      authWindow.webContents.on('will-navigate', (event, url) => {
        handleNavigation(url)
      })

      authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
        handleNavigation(newUrl)
      })

      authWindow.loadURL(authUrl)
    })
  }

  fetchAccessTokens(code): Promise<any> {

    return new Promise((resolve) => {
      return axios.post(this.GOOGLE_TOKEN_URL, qs.stringify({
        code,
        client_id: this.GOOGLE_CLIENT_ID,
        client_secret: this.GOOGLE_CLIENT_SECRET,
        redirect_uri: this.GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
        code_verifier: this.verifier
      }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }).then((response) => {
          resolve(response.data)
        }).catch((err) => {
          console.log(JSON.stringify(err))
        })
    });
  }

  loginWithGoogle(callback: any) {
    let that = this;
    let userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf(' electron/') > -1) {
      this.signInWithPopup().then((code) => {
        that.fetchAccessTokens(code).then((tokens) => {
          let token = tokens.id_token;
          var credential = firebase.auth.GoogleAuthProvider.credential(
            token);
          firebase.auth().signInAndRetrieveDataWithCredential(credential).then(function (result) {
            callback();
          });
        });
      })
    }
  }
}