var mongoDB = require("../config/config").mongoDB;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/*	If this script file is linked in index.html, this function
    establishes a connection to our database while Marvin is
    running */
var connectDB = function () {
	mongoose.Promise = global.Promise;
	mongoose.connect(mongoDB.link);
};

// Clears errors for multiple definition of models/Schemas
mongoose.models = {};
mongoose.modelSchemas = {};

var cantinaSchema = new Schema ({
	day: String,
	date: String,
	meal_0: String,
	meal_1: String,
	meal_2: String,
	cafe42: String
});

var postSchema = new Schema ({
	type: String,
	timestamp: String,
	message: String
});

var projectIDSchema = new Schema ({
	projectID: Number,
	projectName: String
});

var studentSchema = new Schema ({
	studentID: Number,
	campus: Number,
	cursus: Number,
	correctionPoints: Number,
	login: String,
	displayName: String,
	photo: String,
	phone: String,
	piscine: String
});

var tokenSchema = new Schema({
	db_id: Number,
	accessToken: String,
	refreshToken: String
});

var testSchema = new Schema ({
	testID: String,
	testName: String
});

var inputData = new Schema ({
	source: String,
	message: String
});

var analyticsData = new Schema ({
	source: String,
	year: Number,
	month: Number,
	date: Number,
	function: String,
	calls: Number,
	phrase: String
});

var marvinMongo = {
	/*  For every new module that is added that requires saving or caching of 
      information to our database, a Schema must be defined above and
      a model must be set below */
	Models: {

		Analytics: mongoose.model("Analytics", analyticsData),
		Menu: mongoose.model("Menu", cantinaSchema),
		Input: mongoose.model("Input", inputData),
		Post: mongoose.model("Post", postSchema),
		ProjectID: mongoose.model("ProjectID", projectIDSchema),
		Student: mongoose.model("Student", studentSchema),
		Test: mongoose.model("Test", testSchema),
		Token: mongoose.model("Tokens", tokenSchema)

	}
};

module.exports = marvinMongo;