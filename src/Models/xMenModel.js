const mongoose = require("mongoose");

const xMenModel = new mongoose.Schema({
	name: String,
	nick: String,
	isXMen: Boolean,
	powers: [],
});

module.exports = xMenModel;
