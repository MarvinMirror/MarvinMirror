var Gpio = require ('pigpio').Gpio,
        trigger = new Gpio(23, {mode: Gpio.OUTPUT}),
        echo = new Gpio(24, {mode: Gpio.INPUT, alert: true}),
        relay = new Gpio(17,{mode: Gpio.OUTPUT});

var MICROSECONDS_PER_CM = 1e6/34321;

trigger.digitalWrite(0);

(function sensor(){
        var startTick, endTick, diff, distance;

        echo.on('alert', function (level, tick) {

                if(level == 1){
                        startTick = tick;
                }else{
                        endTick = tick;
                        diff = (endTick >> 0) - (startTick >> 0);
                        distance = (diff / 2 / MICROSECONDS_PER_CM);
			console.log(distance);
                        if(distance >= 30 && distance <= 250){
                                relay.trigger(10, 1);
                        }else{
                                relay.trigger(10, 0);
                        }
                }
        });
}());
setInterval(function sensor() {
        trigger.trigger(10, 1);
}, 4000);

