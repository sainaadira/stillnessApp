module.exports = function (app, passport, db, ObjectId) {

  app.get('/', (req, res) => {


    db.collection('journal').find().toArray((err, result) => {
      if (err) return console.log(err)

      console.log(result)
      res.send('hello world')

    })
  })
  app.post('/Login', (req, res) => {
    console.log(req.body)
  })

}

