module.exports = function (app, passport, db, ObjectId) {

  app.get('/userJournals', isLoggedIn, (req, res) => {
    let uId = ObjectId(req.session.passport.user)
    console.log(uId);

    db.collection('journal').find({ user: uId }).toArray((err, result) => {
      if (err) return console.log(err)
      console.log(result)
      res.send({ result: result })
    })
  })
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/moodJournal', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
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
    let uId = ObjectId(req.session.passport.user)
    console.log(uId);
    db.collection('journal').save({ journal: req.body.journalEntry, mood: req.body.mood, user: uId }, (err, result) => {
      if (err) return console.log(err)
      res.send({ success: 'success' })
    })
  });

  // put method to update journal entries
  app.put('/journal', (req, res) => {
    db.collection('journal')
      .findOneAndUpdate({ _id: req.body.journal._id }, {
        $set: {
          journal: req.body.journal.journal
        }
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })

  // delete method to delete journal entries: currently not fully working
  app.delete('/journal', (req, res) => {
    db.collection('journal')
      .deleteOne({ _id: req.body.journal._id })
  })
}




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}


