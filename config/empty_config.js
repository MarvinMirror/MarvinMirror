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

    fb_app: {
    client_id: "",
    app_secret: ""
    },

    slack_app: {
    //you don't use id and secret to get last announcement
    client_id: ".",
    app_secret: "",
    channel_announcements: "",
    token: ""
    }, 

    cantinaAPI: 'https://cantina.42.us.org/marvins_meals',
    openWeatherMapAPI: 'http://api.openweathermap.org/data/2.5/',
    location: "Fremont",
    timeZone: "America/Los_Angeles",
    units: "imperial",
    waitingTime: 10000,
    geoNamesAPI: {
        username: "marvinmirror",
        search: "http://api.geonames.org/searchJSON?q=",
        timezone: "http://api.geonames.org/timezoneJSON?"
    },
    fbAPI: 'https://graph.facebook.com/v2.11/42SiliconValley',
    slackAPI: 'https://slack.com/api/'

}
module.exports = config;