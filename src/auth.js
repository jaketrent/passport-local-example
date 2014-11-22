var extend = require('lodash-node/modern/objects/assign')

var defaults = {
  failureRedirect: '/failure'
}

function protectRoute(opts) {
  var options = extend({}, defaults, opts)
  return function (req, res, next) {
    console.log('req.user')
    console.log(req.user)
    if (!req.user) return res.redirect(options.failureRedirect)

    console.log('happy, authed')
    next()
  }
}


exports.protectRoute = protectRoute