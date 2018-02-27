//! Adapted for use in MarvinMirror by 42US team 'Marvin Mirror'
//! sonus
//! version : 0.1.9
//! author  : Evan Cohen @_evnc
//! license : MIT
//! github.com/evancohen/sonus

'use strict'

//Requirements for listening 
const record = require('node-record-lpcm16');
const stream = require('stream');
var path = require("path");

//Reqirements for wake-up-word detection
const { Detector, Models } = require('snowboy');

//Config file
const my_config = require('../config/config');

//Microphone params
const my_mic = {
  threshold: 0,
  device: null,
  recordProgram: my_config.recordingProgram,
  verbose: false
}

//Speech API options
const encoding = my_config.speech_API.encoding;
const sampleRateHertz = my_config.speech_API.sampleRateHertz;
const languageCode = my_config.speech_API.languageCode;

const ERROR = {
  NOT_STARTED: "NOT_STARTED",
  INVALID_INDEX: "INVALID_INDEX"
}

//Speech recognition object
const Recogn = {}

Recogn.init = (recognizer, nlp) => {
  const speech_recogn = new stream.Writable()
  speech_recogn.listening = false
  speech_recogn.recognizer = recognizer
  speech_recogn.nlp = nlp
  return speech_recogn
}

Recogn.startStreaming = (options, microphone, Recogn) =>
{
  if (Recogn.listening)
  {
    return
  }

  let hasResults = false
  Recogn.listening = true

  const request = {
    config: {
      encoding: my_config.speech_API.encoding,
      sampleRateHertz: my_config.speech_API.sampleRateHertz,
      languageCode: my_config.speech_API.languageCode,
    },
    singleUtterance: true, // If you want to perform continuous recognition, set to false
    interimResults: false, // If you want to get inrerim results, set to true
  };

  const recognitionStream = Recogn.recognizer
    .streamingRecognize(request)
    .on('error', err => {
      Recogn.emit('error', err)
      stopStream()
    })
    .on('data', data => {
        if (data.results[0] && data.results[0].alternatives[0]) {
        
        hasResults = true;
        // Emit partial or final results and end the streams
        if (data.error) {
          Recogn.emit('error', data.error)
          stopStream()
        } else if (data.results[0].isFinal) {
          Recogn.emit('final-result', data.results[0].alternatives[0].transcript.toLowerCase(), Recogn.nlp.get_object)
          stopStream()
        } else {
          Recogn.emit('partial-result', data.results[0].alternatives[0].transcript)
        }
      } else {
        // Reached transcription time limit
        if(!hasResults){
          Recogn.emit('delete_gif', '')
          Recogn.emit('final-result', '')
        }
        stopStream()
      }
  })

  const stopStream = () => {
    Recogn.listening = false
    microphone.unpipe(recognitionStream)
    recognitionStream.end()
  }

  

  microphone.pipe(recognitionStream)
}

// Creating class for export
const Speech_command = {}

Speech_command.init = (options, recognizer, nlp) => {
  
  const speech_options = Object.assign({}, options),
    models = new Models(),
    listener = new stream.Writable(),
    csr = Recogn.init(recognizer, nlp)
 
  listener.mic = {}
  listener.started = false
  
  speech_options.hotwords = [1]
  speech_options.hotwords.forEach(model => {
    models.add({
      file: __dirname + '/' + my_config.wakeUpWord.model,
      sensitivity: my_config.wakeUpWord.sensitivity,
      hotwords : my_config.wakeUpWord.name,
    })
  });
  speech_options.models = models
  
  const detector = listener.detector = new Detector({
    resource: path.resolve(__dirname, '..') + my_config.wakeUpWord.resource,
    models: models,
    audioGain: my_config.wakeUpWord.audioGain
  });

  
  detector.on('silence', () => listener.emit('silence'))
  
  detector.on('sound', () => listener.emit('sound'))

  detector.on('error', () => listener.emit('error'))

  detector.on('hotword', function (index, hotword) {
        listener.trigger(index, hotword)
  });

  csr.on('error', error => listener.emit('error', {streamingError: error}))
  csr.on('delete_gif', data => listener.emit('delete_gif', data))
  csr.on('final-result', (transcript, callback)  => {
    listener.emit('final-result', transcript)
    if (typeof callback === "function")
    {
      return callback(transcript)
    }
  })

  listener.trigger = (index, hotword) => {
    if (listener.started) {
      try {
        listener.emit('hotword', index, hotword)
        listener.emit('listening', index, hotword)
        Recogn.startStreaming(speech_options, listener.mic, csr)
      } catch (e) {
        throw ERROR.INVALID_INDEX
      }
    }
    else {
      throw ERROR.NOT_STARTED
    }
  }

  listener.pause = () => record.pause();

  listener.resume = () => record.resume();

  return listener
}

Speech_command.start = listener => {
  listener.mic = record.start(my_mic)
  listener.mic.pipe(listener.detector)
  listener.started = true
}

Speech_command.trigger = (listener, index, hotword) => listener.trigger(index, hotword)

Speech_command.pause = () => record.pause();

Speech_command.resume = () => record.resume();

Speech_command.stop = () => record.stop();

module.exports = Speech_command