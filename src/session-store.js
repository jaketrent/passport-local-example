
var sessions = {}
var sessionStore = {
  get: function (sid, callback) {
    console.log('get sid')
    console.log(sid)
    callback(null, sessions[sid])
  },
  set: function (sid, session, callback) {
    console.log('set sid')
    console.log(sid, session)
    sessions[sid] = session
    callback(null, session)
  },
  destroy: function (sid, callback) {
    console.log('destroy sid')
    console.log(sid)
    delete sessions[sid]
    console.log('sessions in store')
    console.log(sessions)
    callback()
  }
}

module.exports = sessionStore