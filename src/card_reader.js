var moment = require('moment');
var getJSON = require('../src/getJSON');
var manageDOM = require('../src/manageDOM');
var mongoose = require('mongoose');
var Models = require('../src/mongoDB').Models;

var Menu = Models.Menu;
var Test = Models.Test;
var ProjectID = Models.ProjectID;

function checkMenuTomorrow() {
  let tomorrow = Menu.findOne( {'day': 'Tomorrow'});
  return tomorrow.exec();
}

function checkDBTest() {
    let find = "5 minutes test";
    var query = { 'testID': find };
    let test = Test.findOne( query );
    return test.exec();
}

function checkDBProjects () {
    query = ProjectID.findOne( {'projectID': 27} );
    
    return query.exec((err, data) => {
        if (err) console.error(err);
        console.log(data.projectID + " : " + data.projectName);
    }) ;
}

function checkTest (fn) {
    fn()
        .then(console.log);
}

var tests = {
    
    updateTest: () => {
        console.log(moment().format("h:mm:ss a"));
    let find = "5 minutes test";
    var query = { 'testID': find };
    let update = {
      testID: find,
      testName: moment().format('h:mm:ss a')
    };
    let options = { upsert: true, new: true };
    
    return Test.findOneAndUpdate(query, update, options, (err, data) => {
        if (!err) {
            console.log("updated " + data.testID + " at " + data.testName);
        }
        else {
            console.error(err);
        }
    })
  }
}

module.exports = tests;