var express = require('express')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var sessionStore = require('./session-store')
var userStore = require('./user-store')
var path = require('path')
var auth = require('./auth')

var protect = auth.protectRoute.bind(auth, { failureRedirect: '/failure' })
var app = express()

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ secret: 'keyboard cat' }))
app.use(passport.initialize())
app.use(passport.session({
  store: sessionStore
}))



passport.use(new LocalStrategy(
  function(username, password, done) {
    userStore.findUser({ username: username }, function(err, user) {
      if (err) return done(err)

      if (!user)
        return done(null, false, { message: 'Incorrect username.' })

      if (!user.validPassword(password))
        return done(null, false, { message: 'Incorrect password.' })

      return done(null, user)
    })
  }
))

passport.serializeUser(function(user, done) {
  done(null, user.username)
})

passport.deserializeUser(function(username, done) {
  userStore.findUser({ username: username }, done)
})


app.get('/', function (req, res) {
  res.redirect('/login')
})

app.get('/login', function (req, res) {
  res.render('login')
})

app.get('/logout', function(req, res) {
  req.logout()
  res.redirect('/login')
})

app.get('/success', function (req, res) {
  res.render('success')
})

app.get('/failure', function (req, res) {
  res.render('failure')
})

app.get('/protected', protect(), function (req, res) {
  res.render('protected')
})

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure'
  })
)

app.listen(3000, function () {
  console.log('listening at 3000...')
})