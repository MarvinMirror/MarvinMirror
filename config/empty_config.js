var config = {
    address: "localhost",
    // port: "8080",
    // ipWhiteList:,
    language: "en",

    ftOauth: {
        client_id: "",
        client_secret: "",
        redirectUri: "http://localhost",
        authorizationURL: "https://api.intra.42.fr/oauth/authorize",
        tokenURL: "https://api.intra.42.fr/oauth/token"
    },

    currentWeather: {
        location: "Fremont",
        units: "imperial",
        appKey: ""
    },

    weatherForecast: {
        location: "Fremont",
        units: "imperial",
        cnt: "5",
        appKey: ""
    }
}
module.exports = config;
