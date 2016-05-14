const fs = require('fs-promise')

module.exports = { retrieve, store }

function store (input) {
  const site = parseSite(input)
  const password = parsePassword(input)
  console.log('site', site)
  return fs.readFile('.passwords.json', 'utf8').then(function (data) {
    var passwords
    console.log('data', data)
    try {
      passwords = JSON.parse(data)
    } catch (e) {
      passwords = {}
    }
    console.log('all passwords', passwords)
    passwords[site] = password
    console.log('passwords', passwords)
    return fs.writeFile('.passwords.json', JSON.stringify(passwords))
    .then(function () {
      return '_tweep tweep tweep_'
    })
  })
  .catch(function (err) {
    console.trace(err)
    return '\`' + err.message + '\`'
  })
}

function retrieve (input) {
  const site = parseSite(input)
  return fs.readFile('.passwords.json', 'utf8').then(function (data) {
    var passwords
    try {
      passwords = JSON.parse(data)
    } catch (e) {
      passwords = {}
    }
    return passwords[site] || '\`!@#$%\`'
  })
  .catch(function (err) {
    console.trace(err)
    return '\`' + err.message + '\`'
  })
}

function parseSite (input) {
  const words = input.split(' ')
  return words[words.lastIndexOf('for') + 1]
}

function parsePassword (input) {
  const words = input.split(' ')
  return words[words.lastIndexOf('for') + 2]
}
