 var express = require('express');
 routes = require('./routes');
 http = require('http').Server(app);
 var Chat = require('db/models/chat');
 var User = require('db/models/users');
 bodyParser = require('body-parser');
 var session = require('express-session');
 var flash = require('connect-flash');
 var cookieParser = require('cookie-parser');
 require('rootpath')();
 var app = module.exports = express.createServer();
 var io = require('socket.io')(app);

 var morgan = require('morgan');
 var passport = require('passport');
 // var async = require('async');



 // Configuration

 app.use(morgan('dev')); // log every request to the console
 app.use(cookieParser());

 app.use(express.methodOverride());
 app.configure(function() {
     app.use('/', express.static(__dirname + '/public'));
 });


 // app.use(morgan());

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.urlencoded({
     extended: false
 }));
 app.use(bodyParser.json({
     type: 'application/vnd.api+json'
 }));
 app.configure('development', function() {
     app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
 });

 app.configure('production', function() {
     app.use(express.errorHandler());
 });
 app.use(session({
     secret: 'hello',
     resave: true,
     saveUninitialized: true
 }));
 io.sockets.on('connection', function(socket) {

     // Chat.find({}, function(err, docsCallback) {
     //     //console.log(docsCallback);
     //     if (err) throw err;
     //     //console.log('Sending old messages');
     //     socket.emit('get old messages', docsCallback);


     // });


     User.find({ isOnline: true }, function(err, user) {
         console.log("user list", user);
         // console.log("Error",err);
         if (err) throw err;
         else io.sockets.emit('user list', user);

     });
     socket.on('send msg', function(data) {
         // console.log("Username", data.user.local.username);
         //console.log("user id", data.user._id, "Email", data.user.local.email);
         //console.log("$scope.receiverID", data.receiverId);
         io.sockets.emit('send msg', data);

         var newMsg = new Chat({
             text: data.message,
             senderID: data.user._id,
             //sendername:data.user.local.username, 
             senderEmail: data.user.local.email,
             receiverId: data.receiverId
         });
         newMsg.save(function(err, msg) {
             if (err) throw err;

             else io.sockets.emit('get msg', msg);


         });
     });
     socket.on('disconnect', function() {
         console.log('user disconnected');
     });
 });

 // app.use(session({ secret: 'kjsdgfjhagsdfhkjgsahdf' })); // session secret
 app.use(passport.initialize());
 app.use(passport.session());
 app.use(flash());
 require('./config/passport')(passport);

 // Routes
 require('./routes')(app, passport);

 // var user = require('../../0db/models');
 app.listen(8000, function() {
     console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
 });
