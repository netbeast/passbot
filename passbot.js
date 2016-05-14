// touch file if it does not exist
const fs = require('fs')
fs.closeSync(fs.openSync('.passwords.json', 'w'))

// load environment
require('dotenv').config()

// launch bot
require('./src')
