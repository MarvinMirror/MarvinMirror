/******************************************************************************\
**  __  __          _______      _______ _   _ _  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |  _  /|  _  /| |  | |  _  /       Kyle Murray                **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

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