/******************************************************************************\
**  __  __          _______      _______   ___  _____                       **
** |  \/  |   /\   |  __ \ \    / /_   _| \ | ( )/ ____|                      **
** | \  / |  /  \  | |__) \ \  / /  | | |  \| |/| (___                        **
** | |\/| | / /\ \ |  _  / \ \/ /   | | | . ` |  \___ \                       **
** | |  | |/ ____ \| | \ \  \  /   _| |_| |\  |  ____) |                      **
** |_|  |_/_/___ \_\_|  \_\__\/ __|_____|_| \_| |_____/                       **
** |  \/  |_   _|  __ \|  __ \ / __ \|  __ \                                  **
** | \  / | | | | |__) | |__) | |  | | |__) |      contributions by:          **
** | |\/| | | | |    _/|_    /| |  | |  _  /       Anastasia Zimina           **
** | |  | |_| |_| | \ \| | \ \| |__| | | \ \                                  **
** |_|  |_|_____|_|  \_\_|  \_\\____/|_|  \_\                                 **
**                                                                            **
\******************************************************************************/

const Hello = require('./voice.js')

const my_config = require('../config/config');

//Speech API(Google SDK) and NLP API(Wit.ai)
const speech = require('@google-cloud/speech');
const {Wit, log} = require('node-wit');

//Google API credencials
const google_cred = {
    projectId: process.env.MARVIN_SPEECH_PROJECT_ID,
    keyFilename: my_config.speech_API.key_path
}

//Google SDK client
const recognizer = new speech.SpeechClient(google_cred);

//NLP client
const nlp_client = new Wit({
    accessToken: process.env.MARVIN_NLP_API_TOKEN,
  });

var info = {}

//NLP return
var nlp = {
    get_object:  async function (data) {
        nlp_client.message(data)
        .then((data) => {
            var result = JSON.parse(JSON.stringify(data))
            info.text = result['_text'];
            info.check = (result.entities.datetime !== undefined) ? result.entities.datetime : null;
            info.period = (result.entities.datetime !== undefined) ? result.entities.datetime[0].grain : null;
            info.date = (result.entities.datetime !== undefined) ? result.entities.datetime[0].value : null;
            info.intent = (result.entities.intent !== undefined) ? result.entities.intent[0].value : 'I do not know that';
            info.location = (result.entities.location !== undefined) ? result.entities.location[0].value : null;
            info.units = (result.entities.degrees !== undefined) ? result.entities.degrees[0].value : null;
            info.wikiword = (result.entities.wikipedia_search_query !== undefined) ? result.entities.wikipedia_search_query[0].value : null;
            info.dictionary = (result.entities.dictionary !== undefined) ? result.entities.dictionary[0].value : null;
            console.log(JSON.stringify(info))
            return (info)
        })
    }
}

const hi = Hello.init({}, recognizer, nlp)

Hello.start(hi)

hi.on('hotword', (index) => console.log("What do you want from me?!"))
hi.on('listening', (index) => console.log("Marvin is listening"))
hi.on('delete_gif', (index) => console.log("Delete_sound_gif"))
hi.on('final-result', result =>console.log(result))
hi.on('error', error => console.error(error))
