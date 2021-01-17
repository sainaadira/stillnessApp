const getMoodPhrase = require('./Utils/mood.js')

module.exports = function (app, passport, db, twilioClient, ObjectId) {

  app.get('/userJournals', isLoggedIn, (req, res) => {
    let uId = ObjectId(req.session.passport.user)
    console.log(req.user);

    db.collection('journal').find({ user: uId }).toArray((err, result) => {
      if (err) return console.log(err)
      console.log(result)
      res.send({ result: result })
    })
  })
  // processes the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/moodJournal', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // processes the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/moodJournal', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // post method to store mood journal entry document to mongodb
  app.post('/saveJournalEntry', isLoggedIn, (req, res, next) => {
    let uId = ObjectId(req.session.passport.user)
    console.log(uId);
    // to do: validating the request content 
    db.collection('journal').save({ journal: req.body.journalEntry, mood: req.body.mood, user: uId, createdAt: new Date() }, (err, result) => {
      if (err) return console.log(err, result)
      // variable that stores the text message and sends the mood/getMoodPhrase() function that contains the phrases depending on the mood user has chosen.
      const smsMessage = 'Hello, ' + req.user.local.firstName + ' ' + 'I know you are feeling ' + req.body.mood + ' but just know that ' + getMoodPhrase(req.body.mood)
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
  app.put('/journal', (req, res) => {
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
  app.delete('/journal', (req, res) => {
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




