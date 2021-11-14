const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const webpush = require('web-push')
const morgan = require('morgan')

const app = express()

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
// app.use(bodyParser.json())
// ###You can generate VAPID keys using the command:
// **./node_modules/.bin/web-push generate-vapid-keys**
webpush.setVapidDetails("mailto: lexferramirez@gimal.com", "BI69y53JoqSDO-iwoz4lPGVa9pktHLSZ-TDIycD8N5VLK0MpulVxAYWm8pJkJuBk2GP5ygm47W04Y9nBFICSR2s", "L7Ow7ZpTge_s373rZ2gHdjoYiHp9CgLqxuXBX8L56Vg")

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.post('/notifications/subscribe',async (req, res) => {

  console.log(req.body);
  const payload = JSON.stringify({
    title: req.body.title,
    description: req.body.description,
    icon: req.body.icon
  })

  // console.log(req.body.subscription);
  // webpush.sendNotification(req.body.subscription, payload)
  //   .then(result => console.log())
  //   .catch(e => console.log(e.stack))

  // res.status(200).json({ 'success': true })

  res.status(200).json();
  try {
    await webpush.sendNotification(req.body.subscription, payload);
  } catch (error) {
    console.log(error);
  }

});

app.listen(9000, () => console.log('The server has been started on the port 9000'))