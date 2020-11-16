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


  // post method to store mood journal entry document to mongodb
  app.post('/saveJournalEntry', (req, res, next) => {
    // let uId = ObjectId(req.session.passport.user)
    // console.log(uId);
    db.collection('journal').save({ journal: req.body.journalEntry }, (err, result) => {
      if (err) return console.log(err)
      res.redirect('moodJournalHistory')
    })
  });

}

