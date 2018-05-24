'use strict';
const electron = require('electron');
const {
    app } = electron;
const {
    BrowserWindow
} = electron;

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 1024,
        height: 600        
    });

    var url = 'file://' + __dirname + '/../www/index.html';
    var Args = process.argv.slice(2);
    Args.forEach(function (val) {
        if (val === "test") {
            url = 'http://localhost:8100'
        }
    });

    win.loadURL(url);

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});