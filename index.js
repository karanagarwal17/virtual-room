var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var roomrouter = require('./routes/roomrouter');
var app = express();
var server = app.listen(3000);

var io = require('socket.io')(server);

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var url = 'mongodb://localhost:27017/virtual-room';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	// we're connected!
	console.log("Connected correctly to server");
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

io.on('connection', function(socket){
	console.log("User connected!!");
	var defaultRoom = 'test';

	var rooms = ['test','test1'];

	socket.emit('setup', {
		rooms: rooms
	});

	socket.on('new user', function(data){
		data.room = defaultRoom;
		socket.join(defaultRoom);
		io.in(defaultRoom).emit('user joined',data);
	})

	socket.on('new message', function(data){
		console.log("New message has arrived");
		io.emit('message created', data);
	})

})

app.use('/room', roomrouter);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500)
			.json('error', {
				message: err.message,
				error: err
			});
	});
} else {
	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500)
			.json('error', {
				message: err.message,
				error: {}
			});
	});
}

module.exports = app;
