const Hello = require('./voice.js')

const my_config = require('../config/config');

//Speech API(Google SDK) and NLP API(Wit.ai) 
const speech = require('@google-cloud/speech');
const {Wit, log} = require('node-wit');

//Google API credencials
const google_cred = {
    projectId: my_config.speech_API.projectId,
    keyFilename: my_config.speech_API.key_path
}

//Google SDK client
const recognizer = new speech.SpeechClient(google_cred);

//NLP client
const nlp_client = new Wit({
    accessToken: my_config.nlp_API.token,
  });

var info = {}

//NLP return
var nlp = {
    get_object:  async function (data) {
        nlp_client.message(data)
        .then((data) => {
            var result = JSON.parse(JSON.stringify(data))
            info.text = result['_text'];
            info.intent = (result.entities.intent !== undefined) ? result.entities.intent[0].value : 'I do not know that';
            info.location = (result.entities.location !== undefined) ? result.entities.location[0].value : null;
            info.units = (result.entities.degrees !== undefined) ? result.entities.degrees[0].value : null;
            console.log(JSON.stringify(info))
            return (info)
        })
    }
}

const hi = Hello.init({}, recognizer, nlp)

Hello.start(hi)

hi.on('hotword', (index) => console.log("What do you want from me?!"))
//hi.on('partial-result', result => console.log(result))
hi.on('final-result', result =>console.log(result))
hi.on('error', error => console.error(error))

