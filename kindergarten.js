var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var KindergartenSchema = new Schema({
  name: String,
  description: String,
  email: String,
  phone: String,
  url: String,
  openingHours: [String],
  imageUrl: String,
  latitude: Number,
  longitude: Number
});
module.exports = mongoose.model("Kindergarten", KindergartenSchema);
