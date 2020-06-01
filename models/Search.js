const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  place: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  placeName: {
    type: String,
    required: true,
  },
  celsiusDegrees: {
    type: Number,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
});

module.exports = Search = mongoose.model("search", SearchSchema);
