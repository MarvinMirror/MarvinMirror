var config = {
    address: "localhost",
    // port: "8080",
    // ipWhiteList:,
    language: "en",

    window: {
        width: 1000,
        height: 1600
    },

    ftOauth: {
        client_id: "",
        client_secret: "",
        redirectUri: "http://localhost",
        authorizationURL: "https://api.intra.42.fr/oauth/authorize",
        tokenURL: "https://api.intra.42.fr/oauth/token"
    },

    currentWeather: {
        appKey: ""
    },

    weatherForecast: {
        appKey: ""
    },

    openWeatherMapAPI: 'http://api.openweathermap.org/data/2.5/',
    location: "Fremont",
    units: "imperial"
}
module.exports = config;
