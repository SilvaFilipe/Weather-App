const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  openWeatherId: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = Place = mongoose.model("place", PlaceSchema);
