const getMoodPhrase = require('./utils/mood.js')

module.exports = function (app, passport, db, twilioClient, ObjectId) {

  app.get('/api/userJournals', isLoggedIn, (req, res) => {
    let uId = ObjectId(req.session.passport.user)
    db.collection('journal').find({ user: uId }).toArray((err, result) => {
      if (err) {
        console.log(err)
        res.send(err)
      }
      res.send({ result: result })
    })
  })

  // processes the login form
  app.post('/api/login', passport.authenticate('local-login', {
    successRedirect: '/moodJournal', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // processes the signup form
  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/moodJournal', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // post method to store mood journal entry document to mongodb
  app.post('/api/saveJournalEntry', isLoggedIn, (req, res) => {
    let uId = ObjectId(req.session.passport.user)
    console.log(uId);
    db.collection('journal').save({ journal: req.body.journalEntry, mood: req.body.mood, user: uId, createdAt: new Date() }, (err, result) => {
      if (err) return console.log(err, result)
      // variable that holds the body of the text based on the mood the user has chosen.
      const smsMessage = 'Hey, ' + req.user.local.firstName + ' ' + 'we see that you are feeling ' + req.body.mood + '. We just want you to know that ' + getMoodPhrase(req.body.mood)
      // creates the message body to send to user's phone
      twilioClient.messages
        .create({
          body: smsMessage,
          from: '+18135170791',
          to: req.user.local.phone
        })
        .then(message => {
          console.log(message.sid)
          res.send({ success: 'success' })
        }).catch(err => {
          console.log(err)
          res.send({ sucess: 'success' })
        });
    })
  });

  // put method to update journal entries
  app.put('/api/journal', (req, res) => {
    db.collection('journal')
      .findOneAndUpdate({ _id: ObjectId(req.body._id) }, {
        $set: {
          journal: req.body.journal
        }
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
  })
  // delete method to delete journal entries
  app.delete('/api/journal', (req, res) => {
    console.log(ObjectId(req.body._id))
    db.collection('journal')
      .findOneAndDelete({ '_id': ObjectId(req.body._id) })
      .then(),
      (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      }
  })

  // function to check if user is logged in
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}




