require('dotenv/config')
const moment = require('moment');
require('moment-timezone')
require('log-timestamp')(
    function () {
        return `[${moment().tz('America/Sao_Paulo').format('DD/MM - HH:mm:ss')}]`
    }
)

channelsList = (process.env.CHANNELS).split(',');

console.debug('Starting farmer for channels: ' + channelsList);

const tmi = require('tmi.js');
const client = new tmi.Client({
    options: { debug: false },
    identity: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    channels: channelsList
});

client.on('join', (channel, username, self) => {
    if (self) {
        console.debug(`Joined ${channel}.`);
    }
});

client.on('disconnected', (reason) => {
    console.debug(`Disconnected. Reason: ${reason}.`);
});

client.connect();

// Workaround for render.com
const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
    res.send("Ok!");
});

app.listen(port, function () {
    console.log(`Twitch Farmer is listening on port ${port}!`);
});
