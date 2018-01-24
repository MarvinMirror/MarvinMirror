function command_execution(event, message) {
    var result = JSON.parse(message)
    console.log(result.intent)
    var options = {
        'get_weather' : getWeatherAtLocation(result.location, result.units), 
    }
    options[result.intent]
}

module.exports = command_execution;