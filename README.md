# Dirsh (Direct Cash) is a Private Scalable Instant Payment Platform

[dirsh.com](https://dirsh.com)

## Descriptions of Folders

* .vscode	- Visual Studio Code related launch and debug scripts
* Art	- graphics related to Dirsh
* airdropDistributor - Airdrop server code based on Node.js meant to run on Heroku platform
* bountyDistributor	- Ionic based desktop app to distribute bounties
* feedbackReceiver - Native Android SDK + Kotlin app to manage contact form submissions
* mainFunctions	- Firebase Cloud Functions + Node.js based server code to manage task on the Dirsh server
* redditStylesheet - Reddit page style sheets
* wallet	- Ionic + Electron based wallet app. Currently Android and Windows tested. Might work on other platforms
* website	- Dirsh website source code
* websiteFunctions - Firebase Cloud Functions + Node.js based server code to manage task on the Dirsh website

## Wallet Execution Guide

### Android (Tested several Android versions)

Install from [Google Play](https://play.google.com/store/apps/details?id=com.dirsh.wallet)

#### OR

* Download .apk file from the [Releases](https://github.com/JarmoKukkola/DirshPlatform/releases)
* Go to "Settings"-"Security" of your Android phone (might depend of the model of the phone) and enable "Unknown sources"
* Install the .apk

### Windows (Tested in Windows 7)

* Download .zip file from the [Releases](https://github.com/JarmoKukkola/DirshPlatform/releases)
* Unzip the file
* Execute "com.dirsh.wallet.exe"

### Linux (Tested in Ubuntu 18.0.4)
* Download .tar.gz file from the [Releases](https://github.com/JarmoKukkola/DirshPlatform/releases)
* Unpack the file
* Run "chmod +x com.dirsh.wallet" in Bash to make the file executable
* Run "./com.dirsh.wallet" in Bash
