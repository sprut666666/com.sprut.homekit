# HomeKit for Homey

---

### Main
I don't agree with the rules of publishing applications, I want to choose to whom to donate money.
Now Homey is trying to impose rules file. And forbid you to help to whom you want .

The more popularity with Homey - the more chaos ;)

Look at the AppStore and Google Play, you can't wage war with a hundred apps that can play streaming videos just one chooses for himself the right.

I defend the position for the future. My proposal was to make the following rules: if you post a fork or an analogue of the main application - you must provide a link to the main application, if you want to insert the donation be sure to specify the main author. I think this is true, then you decide to pay or not and how many stars to put....

If you agree with me write to the creators of Homey support@athom.com

---

![Image of paircode](https://github.com/sprut666666/com.sprut.homekit/raw/master/settings/code.png)

After Homey is paired, go to "settings" -> "HomeKit". There select the devices you want to pair with "HomeKit" and wait =)
Example of work: https://www.youtube.com/watch?v=yZWt6jDCl7E (New video from Homey the work)

If you have problems update your "I" device & Apple TV. On iOS 11 everything works perfectly. If you don't see for example the "SPEAKER" look here https://itunes.apple.com/us/app/elgato-eve/id917695792?mt=8

If the problem remained fully describe the situation. If you found any bugs, any other feature you can create an issue on [com.sprut.homekit](https://github.com/sprut666666/com.sprut.homekit)

You can add any device and if it supported device types they will be added to HomeKit. If the device is not supported device types will be added to the device "NOT SUPPORTED" - If you want I added a new device type send me "full info:" the device from the log on sprut666666@gmail.com

Now supports the types:
- Light (On-off, dim, Temperature control, RGB)
- Fan
- Switch
- Outlet
- Doorlock
- Curtains
- Motion sensor
- Humidity sensor
- Light sensor
- Carbon dioxide sensor
- Temperature sensor
- Leak sensor
- Smoke sensor
- Contact sensor (door/window sensor)
- AirQuality sensor
- Thermostat
- Volume speaker
- Vacuum cleaner
- Button (simple and Play/Pause etc)
- Doorbell button (as Motion sensor)

+ Battery service for all

---

### About
Many thanks to the developer who wrote the library [has-node](https://github.com/abedinpour/HAS) Without which the application cannot run ;)
Many thanks [abedinpour](https://github.com/abedinpour) so much for the work done.

The basis of this application is taken development [com.swttt.homekit](https://github.com/swttt/com.swttt.homekit)
Many thanks [Swttt](https://github.com/swttt) so much for the work done.

And I [Sprut](https://github.com/sprut666666) - engaged in ongoing app development =)

---

### Changelog

#### 1.1.7
- If wakeup interval > 15 seconds - no online state

#### 1.1.6
- Extended support for status updates of devices

#### 1.1.5
- Verification of successful installation of the new parameters in Homey
- Fix for MiLight

#### 1.1.4
- Small fixes

#### 1.1.3
- Critical bugfix when adding many devices

#### 1.1.2
- update has-node 0.2.3

#### 1.1.1
- fix WindowCovering

#### 1.1.0
- update has-node 0.2.2
- new ColorTemperature
- fix RGBW

#### 1.0.5
- fix bugs in Thermostat & expansion of functionality

#### 1.0.4
- fix Thermostat not measure_temperature

#### 1.0.3
- Add Doorbell button (as Motion sensor)

#### 1.0.2
- Add full device info for debug

#### 1.0.1
- Support 2 bridges for example com.swttt.homekit

#### 1.0.0
- Initial release
