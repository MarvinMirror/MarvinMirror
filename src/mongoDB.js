var mongoDB = require('../config/config').mongoDB;
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var connectDB = function () {

  mongoose.Promise = global.Promise;
  mongoose.connect(mongoDB.link);

}

// Clears errors for multiple definition of models/Schemas
mongoose.models = {};
mongoose.modelSchemas = {};

var tokenSchema = new Schema({
  db_id: Number,
  accessToken: String,
  refreshToken: String
});

var cantinaSchema = new Schema ({
  day: String,
  date: String,
  meal_0: String,
  meal_1: String,
  meal_2: String,
  cafe42: String
});

var projectIDSchema = new Schema ({
  projectID: Number,
  projectName: String
});

var ourModels = {

  Token: mongoose.model('Tokens', tokenSchema),
  Menu: mongoose.model('Menu', cantinaSchema),
  ProjectID: mongoose.model('ProjectID', projectIDSchema)

}

module.exports = ourModels;