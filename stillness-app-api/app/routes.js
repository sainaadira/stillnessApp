module.exports = function (app, passport, db, ObjectId) {

  app.get('/', (req, res) => {


    db.collection('journal').find().toArray((err, result) => {
      if (err) return console.log(err)

      console.log(result)
      res.send('hello world')

    })
  })

  // process the login form
  app.post('/Login', passport.authenticate('local-login', {
    successRedirect: '/moodJournal', // redirect to the secure profile section
    failureRedirect: '/Login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));


  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/moodJournal', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));


}

