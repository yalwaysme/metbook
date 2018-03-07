'use strict';

const path = require('path');

// mysql
module.exports.mysql = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  charset: 'UTF8MB4',
  database: 'metBookDB', // change to real name

};

module.exports.pages = path.join(__dirname, '../frontEnd/pages/');
