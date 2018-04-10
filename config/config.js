var config = {
	address: "localhost",
	language: "en",
	ftOauth: {
		ftUrl: "https://api.intra.42.fr",
		redirectUri: "http://localhost",
		authorizationURL: "https://api.intra.42.fr/oauth/authorize",
		tokenURL: "https://api.intra.42.fr/oauth/token"
	},
	fb_app: {
		endpoint: "https://graph.facebook.com/v2.11/42SiliconValley",
	},
	slack_app: {
		slackAPI: "https://slack.com/api/",
		channel_announcements: "C1G4AJ96D",
	},
	urbanDictionaryAPI: "http://api.urbandictionary.com/v0/random",
	wikipediaAPI: "https://en.wikipedia.org/w/api.php",
	cantinaAPI: "https://cantina.42.us.org/marvins_meals",
	openWeatherMapAPI: "http://api.openweathermap.org/data/2.5/",
	location: "Fremont California",
	timeZone: "America/Los_Angeles",
	units: "imperial",
	waitingTime: 20000,
	waitingInput: 15,
	geoNamesAPI: {
		username: "marvinmirror",
		search: "http://api.geonames.org/searchJSON?q=",
		timezone: "http://api.geonames.org/timezoneJSON?"
	},
	speech_API: {
		library: "@google-cloud/speech",
		key_path: "./config/google_key.json",
		encoding : "LINEAR16",
		sampleRateHertz : 16000,
		languageCode : "en-US",
	},
	wakeUpWord:
   {
   	model: "hey_marvin.pmdl",
   	name: "Hey_Marvin",
   	sensitivity: "0.5",
   	resource: "/node_modules/snowboy/resources/common.res",
   	audioGain: 2.0
   },
	nlp_API: {
		library: "node-wit",
	},
	news_api:{
		newsAPI: "https://newsapi.org/v2/top-headlines?sources=",
		sources: ["wired","cnn","techcrunch","bbc-news","mashable","the-next-web"],
	},
	Photo_booth: {
		width: 1024,
		height: 768,
		outputDir: "/home/pi/Pictures/Photo/"
	},
	recordingProgram: "rec",
};

module.exports = config;