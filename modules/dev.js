var ftAPI = require('../src/ftAPI');
var manageDOM = require('../src/manageDOM');
var $ = require("jquery");
var mongoose = require('mongoose');
var Student = require('../src/mongoDB').Models.Student;
var CronJob = require('cron').CronJob;

// Recursive call to get all projects and IDs and cycle through pages
function getAllStudents (n) {
    return getStudentJSON(n)
         .then(() => {console.log(n); getAllStudents(n + 1)})
         .catch(console.error);
}

var getStudentJSON = (n) => {
    let qs = {
        sort: "id",
        "page[size]": "100",
        "page[number]": n
    }
    console.log(n);
    return ftAPI.query42("/v2/users", qs)
        .then(array => {
            for (var i = 0; i < array.length; i++) {
                let update = {
                    'studentID': array[i].id,
                    'login' : array[i].login    
                }
                let find_query = {'studentID': array[i].id};
                let options = { upsert: true, new: true};
                Student.findOneAndUpdate(find_query, update, options, () => {
                    console.log(update);
                });
            }
            if (array.length === 0) throw ("no more pages");
            return Promise.resolve();
        })
        .catch(e => {throw e});
}

var getLoginID = () => {
    var login = document.getElementById('popup__form').value.toLowerCase();

    query = Student.findOne({'login': login});
    
    query.exec((err, data) => {
        if (err) console.error(err);
        console.log(data.studentID);
    }) ;

    document.body.removeChild(document.getElementById('popup'));
}

var autoCantina = new CronJob ('00 30 04 * * *', () => {
	console.log("updating student list");
	getAllStudents(0);
} , null, true, 'America/Los_Angeles');