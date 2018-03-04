const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./models')

const port = process.env.PORT || 5432

const app = express()
  .use(cors())
  .use(bodyParser.json())

const { Event } = db

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  next()
})

app.use(bodyParser.json())
console.log(new Date())

// The GET method requests a representation of the specified resource.
// Requests using GET should only retrieve data and should have no other effect.
app.get('/events', (req, res) => {
  const events = Event
    .findAll()
    .then((events) => {
      res.json(events)
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the events. Please try again' })
    })
})

app.get('/events/:id', (req, res) => {
  const events = Event
    .findById(req.params.id)
    .then((event) => {
      if (event) {
        res.json(event)
      } else {
        res.status(404)
        res.json({ message: 'Event not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the event. Please try again' })
    })
})

// The POST method requests that the server accept the entity enclosed in the request as a new subordinate of the web resource identified by the URI.
// The data POSTed might be, for example, an annotation for existing resources;
app.post('/events', (req, res) => {
  var nowDate = new Date();
  var date = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
  console.log(date)
  console.log(req.body.startdate)
  const newevent = req.body
  if (req.body.startdate > req.body.enddate)
    return console.log('Start date should not be before the end date')
  if (date > req.body.startdate)
    return console.log('Start date should not be before current date')
  else
    Events.create(newevent)
    .then(entity => {
      res.status(201)
      res.json(entity)
    })
    .catch(err => {
      res.status(422)
      res.json({
        message: err.message
      })
    })
})

// The PUT method requests that the enclosed entity be stored under the supplied URI.
// If the URI refers to an already existing resource, it is modified;
// if the URI does not point to an existing resource, then the server can create the resource with that URI.
app.put('/events/:id', (req, res) => {
  const eventId = Number(req.params.id)
  const updates = req.body

  Allevents.findById(req.params.id)
    .then(entity => {
      return entity.update(updates)
    })
    .then(final => {
      res.json(final)
    })
    .catch(error => {
      res.status(500).send({
        message: 'Something went wrong',
        error
      })
    })
})

app.delete('/events/:id', (req, res) => {
  Allevents.findById(req.params.id)
    .then(entity => {
      return entity.destroy()
    })
    .then(_ => {
      res.send({
        message: 'The event was deleted succesfully'
      })
    })
    .catch(error => {
      res.status(500).send({
        message: 'Something went wrong',
        error
      })
    })
})

app.patch('/events/:id', (req, res) => {
  const events = Event
    .findById(req.params.id)
    .then((event) => {
      if (event) {
        event.score = req.body.score
        event
          .save()
          .then((updatedEvent) => {
            res.json(updatedEvent)
          })
          .catch((err) => {
            res.status(422)
            res.json({ message: err.message })
          })
      } else {
        res.status(404)
        res.json({ message: 'Event not found!' })
      }
    })
    .catch((err) => {
      console.error(err)
      res.status(500)
      res.json({ message: 'Oops! There was an error getting the event. Please try again' })
    })
})

app.listen(port, () => {
  console.log(`
Server is listening on ${port}.
Open http://localhost:${port}
to see the app in your browser.
    `)
})
