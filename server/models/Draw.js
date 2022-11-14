const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DrawSchema = new Schema({
  no: {
    type: Number,
    required: true
  },
  firstPrice: {
    type: Number,
    required: true
  },
  secondPrice: {
    type: Number,
    required: true
  },
	thirdPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
		required: true
  },
	time:{
		type:String,
		required:true
	},
},{ timestamps: true });

module.exports = Draw = mongoose.model("draws", DrawSchema);
