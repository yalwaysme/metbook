/*
#   Define option and module lists for various feature sets.
 */

'use strict';

const path = require('path');

// constants for directories
module.exports.webpages = path.join(__dirname, '/pages/');
module.exports.localimg = module.exports.webpages + 'images/';
module.exports.webimg = '/images/';

// todo make the above functions that use path.join to produce full paths