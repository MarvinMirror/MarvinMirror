var moment = require("moment");
var CronJob = require("cron").CronJob;

var config = require("../config/config");
var menuUpdateMongo = require("../modules/cantina").menuUpdate;
var getAllStudents = require("../modules/student").getAllStudents;
var getAllProjects = require("../modules/projects").getAllProjects;

/*	If this script file is linked in index.html, the database will 
	update per every function below at 4:30 am of the selected 
	timezone as long as Marvin is running */
var autoUpdate = new CronJob ("00 30 04 * * *", () => {
	console.log("updating database");
	console.log(moment());

	menuUpdateMongo();
	getAllStudents(0);
	getAllProjects(0);

} , null, true, config.timeZone);

var updateNow = () => {
	console.log("updating database");
	console.log(moment());

	menuUpdateMongo();
	getAllStudents(0);
	getAllProjects(0);
};