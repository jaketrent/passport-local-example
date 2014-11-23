'use strict'

var extend = require('lodash-node/modern/objects/assign')

var defaults = {
  failureRedirect: '/failure'
}

function protectRoute(opts) {
  var options = extend({}, defaults, opts)
  return function (req, res, next) {
    if (!req.user) return res.redirect(options.failureRedirect)

    next()
  }
}


exports.protectRoute = protectRoute
