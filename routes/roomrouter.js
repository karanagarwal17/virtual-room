const express = require('express');
const bodyParser = require('body-parser');
const roomrouter = express.Router();
const Rooms = require('../models/rooms');
const path = require('path');

roomrouter.use(bodyParser.json());

roomrouter.route('/')
  .post(function(req, res, next){
    var room = req.body;
    console.log(room);
    Rooms.create(room, function(err, room){
      if (err) {
        console.log(err);
        return res.status(500).json({err: err});
      }
      console.log('Room Created!!');
      res.status(200).json(room);
    });
  });

roomrouter.route('/:roomId')
.get(function(req, res, next){
  Rooms.findOne({_id: req.params.roomId}, function(err, room){
    if (err) {
      console.log(err);
      return res.status(500).json({err: err});
    }
    var d = new Date();
    var delay = d.getTime() - room.start_time.getTime();
    delay = delay / 1000;
    delay = Math.round(delay);
    room.delay = delay;
    res.status(200).json(room);
  });
});

module.exports = roomrouter;
