var ftAPI = require('../src/ftAPI');
var manageDOM = require('../src/manageDOM');
var request = require('request-promise');
var config = require('../config/config');
var ftOauth = config.ftOauth;
var mongoose = require('mongoose');
var Token = require('../src/mongoDB').Token;

var projectsList = function (){

    ftAPI.query42("/v2/projects/?sort=id&page[size]=100", function (obj) {
        for (var key in obj) {
            console.log(obj[key].id + ": " + obj[key].name);
        }
    });
    // ftAPI.query42("/v2/projects/27/users/?filter=status", function (data) {
    //     console.log(data);
    // });
}

function prjkt(obj) {
    // for (var key in obj) {
    //     console.log(obj[key].id + ": " + obj[key].name);
    // }
    console.log(JSON.parse(obj));
}


var projectFunctions = {

    // whoIs: function(project_name) {
    //     projectsList().then(console.log);
    // }
    whoIs: function() {
        var query = Token.findOne({'db_id': '42'});
        
        query.exec(function(err, data){
            request({
                url: ftOauth.ftUrl + "/v2/projects/27/users/",
                auth: {
                    'bearer': data.accessToken
                },
                qs: {
                    sort: "id",
                    // "filter[pool_year]": "2017",
                    // "filter[first_name]": "Kyle",
                    campus_id: "1"                  
                }
            }).then(prjkt);
        });
    }
}