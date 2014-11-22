var clone = require('lodash-node/modern/objects/clone')
var extend = require('lodash-node/modern/objects/assign')

var users = {
  jaketrent: {
    username: 'jaketrent',
    name: 'Jake',
    pwd: 'password'
  }
}

function giveUserPower(user) {
  return extend(clone(user), {
    validPassword: function (pwd) {
      return users[user.username].pwd === pwd
    }
  })
}

function findUser(user, done) {
  var foundUser = users[user.username]
  if (foundUser) {
    return done(null, giveUserPower(foundUser))
  }
  return done()
}

exports.findUser = findUser