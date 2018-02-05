const request = require('request');

var getJSON = function(url, callback) {

  request.get(url, (error, response, body) => {
    let json = JSON.parse(body);
    if (response.statusCode !== 200)
      callback(error, response);
    else
      callback(null, json);
  })

};

module.exports = getJSON;