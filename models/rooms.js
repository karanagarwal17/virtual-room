const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var roomSchema = new Schema({
  url: {type: String, maxlength: 1000},
  start_time: {type: Date, default: Date.now},
  delay: {type: Number, nullable: true}
},{
  timestamps: true
});

var Rooms = mongoose.model('Room',roomSchema);

module.exports = Rooms;
