'use strict'

var sessions = {}
var sessionStore = {
  get: function (sid, callback) {
    callback(null, sessions[sid])
  },
  set: function (sid, session, callback) {
    sessions[sid] = session
    callback(null, session)
  },
  destroy: function (sid, callback) {
    delete sessions[sid]
    callback()
  }
}

module.exports = sessionStore