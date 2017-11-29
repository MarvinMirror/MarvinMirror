var express = require('express');
var app = express();
var request = require('request');
var config = require('../config/empty_config');
var ftOauth = config.ftOauth;

var accessToken = "e67ea91547f090b140ecc992a98222fe1053a404c38409fcf4d434580b9cfee0";
var ftUrl = "https://api.intra.42.fr";

var ftAPI = {
    
    getCode: function () {

    },

    getToken: function () {
        request({
            url: ftOauth.tokenURL,
            method: 'POST',
            form: {
                'grant_type': 'authorization_code',
                'client_id': ftOauth.client_id,
                'client_secret': ftOauth.client_secret,
                'code': "de1c0342226015310b33661edc5c6585aa77f8a7eb1abf297eef8e798fc21bd2",
                'redirect_uri': ftOauth.redirectUri
            }
          }, function(err, res) {
            var json = JSON.parse(res.body);
            console.log("Access Token:", json.access_token);
            console.log("Refresh Token:", json.refresh_token);
          });
    },

    query42: function (endPoint, callback) {
        request({
            url: ftUrl + endPoint, 
            auth: {
                'bearer': accessToken
            }
        }, function(err, res) {
            var obj = JSON.parse(res.body);
            console.log(obj);
            callback(obj);
        });
    }
}

module.exports = ftAPI;