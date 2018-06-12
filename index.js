var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
const accountSid = 'AC0a7a5180e8c1b84ec72c56fb0355a02b';
const authToken = '290e1db40803877cd85b3bf81c57e543';
const client = require('twilio')('AC0a7a5180e8c1b84ec72c56fb0355a02b', '290e1db40803877cd85b3bf81c57e543');

var server = express()

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended:false}))

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

server.get('/', function(request, response){
 response.render('home.ejs')
})

server.post('/', function(request, response){
 console.log(request.body)
 var message = request.body.SMSmessage
 var num = '+1'+request.body.SMSnumber
  client.messages
    .create({
       body: message , 
       from: '+13238940116',
       to: num
     })
    .then(message => {
      console.log(message.sid)
      response.render('message.ejs')
     })
     .catch(err => {
        console.log(err)
        response.render('error.ejs', {data: err} )
     })
    .done()
})

var port = process.env.PORT

server.listen(port, () => {
 console.log('Server listening on port '+port)
})