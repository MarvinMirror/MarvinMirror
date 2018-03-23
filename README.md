# Marvin's Mirror
## 42's custom voice-controlled personal assistant, built into a mirror for 42 students and guests to explore

### The Interface
As with Alexa, Google Assistant and Siri, Marvin's Mirror is always listening for a wake-up word.

**Say "Hey, Marvin!"** to open a channel with the Marvin's Mirror. When you see the "listening" gif displayed, you have about ten seconds to speak your command or question.

For help, wake up Marvin and then ask, "What can you do?"

### Training Marvin to respond to your voice
1. Using your personal google or github account, log in to https://snowboy.kitt.ai from Chrome or Firefox. You will be able to train with three voice recordings from each unique account.
1. Come back and follow this link: https://snowboy.kitt.ai/hotword/7544 to be taken to the hotword that Marvin uses.
1. Click on '_Record and download the model_' and then '_Record my voice_'.
1. Record your voice 3 times
    1. Press Record
    1. Say 'Hey Marvin' (in whatever manner you would say it were you to use the mirror)
1. Click '_Test the model_'
1. Adjust the model settings to reflect attributes that best match you.
1. Click '_Run the test_' and speak aloud "Hey Marvin". Snowboy will alert you if the wake-up word was registered.
1. When Snowboy recognizes your voice, click '_Save_' and you're done!

### THANK YOU!

## Setting up Marvin on your Mac for development

#### Install Node.js and npm with Homebrew
```
brew install node
brew update
brew upgrade node
```

#### Clone Mirror repo
```
git clone https://github.com/MarvinMirror/MarvinMirror.git
cd MarvinMirror
```
* Create and copy .gitignore files config/config.js and config/google_key.json

#### Update npm packages
```
sudo npm install --unsafe-perm=true
```

## Adding Marvin's Mirror to your Raspberry Pi 3
#### Rotate Screen
```
sudo nano /boot/config.txt
```
* Add “display_rotate=1” to bottom and Ctrl-X
```
sudo reboot
```

#### Install Node.js and npm
```
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Clone Mirror repo
```
git clone https://github.com/MarvinMirror/MarvinMirror.git
cd MarvinMirror
```
* Create and copy .gitignore files config/config.js and config/google_key.json

#### Prepare python audio for snowboy
```
sudo apt-get update
```
* See snowboy github readme: https://github.com/Kitt-AI/snowboy
```
sudo apt-get install -y swig3.0 python-pyaudio python3-pyaudio sox
sudo git clone http://people.csail.mit.edu/hubert/git/pyaudio.git
sudo apt-get install -y libportaudio0 libportaudio2 libportaudiocpp0 portaudio19-dev
cd pyaudio
sudo python setup.py install
sudo apt-get install -y libatlas-base-dev
```
#### Check microphone is working
```
rec t.wav
```
* Record a test
```
aplay t.wav
```

#### Update npm packages
```
sudo npm install
```

#### Microphone:
```
touch ~/.asoundrc && echo -n 'pcm.!default {
  type asym
   playback.pcm {
     type plug
     slave.pcm "hw:0,0"
   }
   capture.pcm {
     type plug
     slave.pcm "hw:1,0"
   }
}' >> ~/.asoundrc
```
