#!/usr/bin/env node
'use strict'
const path = require('path');
const fs = require('fs');
const pwd = path.resolve(__dirname, '');
// node_modules base ./bin
if (pwd.endsWith('/.bin')) {
    require('../vue-demi/scripts/postinstall')
} else {
    require('../scripts/postinstall')
}
