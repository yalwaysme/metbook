/*
# Copyright (C) 2017-2018
# Metbook Server
 */

'use static';

const express = require('express');

const app = express();

const config = require('./config');

const path = require('path');

// logging
app.use('/', (req, res, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});

// static files
app.use('/', express.static(config.webpages, {
    extensions: ['html']
}));

app.get('/', function(req, res) {
    res.send(path.join(config.webpages + '/index.html'));
});

// start the server
app.listen(8080, (err) => {
    if (err) console.error('error starting server', err);
    else console.log('server started');
});
