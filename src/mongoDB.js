var mongoDB = require('../config/config').mongoDB;
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var moment = require('moment');

var connectDB = function () {

  mongoose.Promise = global.Promise;
  mongoose.connect(mongoDB.link);

}

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
})

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

var marvinMongo = {

  Models: {

    Menu: mongoose.model('Menu', cantinaSchema),
    Post: mongoose.model('Post', postSchema),
    ProjectID: mongoose.model('ProjectID', projectIDSchema),
    Student: mongoose.model('Student', studentSchema),
    Test: mongoose.model('Test', testSchema),
    Token: mongoose.model('Tokens', tokenSchema)

  },

  updateDaily: {

    cantina: () => {
      console.log('cantina');
    }
  }

}

module.exports = marvinMongo;