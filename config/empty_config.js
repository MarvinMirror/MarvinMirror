var config = {
    address: "localhost",
    language: "en",

    window: {
        width: 1000,
        height: 1600
    },

    mongoDB: {
        admin: "",
        password: "",
        link: ""
    },

    ftOauth: {
        ftUrl: "https://api.intra.42.fr",
        client_id: "",
        client_secret: "",
        redirectUri: "",
        authorizationURL: "https://api.intra.42.fr/oauth/authorize",
        tokenURL: "https://api.intra.42.fr/oauth/token"

    },

    currentWeather: {
        appKey: ""
     },
 
     weatherForecast: {
         cnt: "5",
         appKey: ""
     },

    cantinaAPI: 'https://cantina.42.us.org/marvins_meals',
    openWeatherMapAPI: 'http://api.openweathermap.org/data/2.5/',
    location: "Fremont",
    units: "imperial",
    waitingTime: 100000
}
module.exports = config;