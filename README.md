# HomeKit for Homey

![Image of paircode](https://github.com/sprut666666/com.sprut.homekit/raw/master/settings/code.png)

After Homey is paired, go to "settings" -> "HomeKit". There select the devices you want to pair with "HomeKit" and wait =)

It is my [Sprut](https://github.com/sprut666666) fork to [com.swttt.homekit](https://github.com/swttt/com.swttt.homekit)
Thanks [Swttt](https://github.com/swttt) so much for the work done.

Example of work: https://www.youtube.com/watch?v=yZWt6jDCl7E (New video from Homey the work)

If you have problems update your "I" device & Apple TV. On iOS 11 everything works perfectly. If you don't see for example the "SPEAKER" look here https://itunes.apple.com/us/app/elgato-eve/id917695792?mt=8

If the problem remained fully describe the situation. If you found any bugs, any other feature you can create an issue on [com.sprut.homekit](https://github.com/sprut666666/com.sprut.homekit)

Differences from HomeyKit:
- The new logic works, you can add any device and if it supported device types they will be added to HomeKit. If the device is not supported device types will be added to the device "NOT SUPPORTED" - If you want I added a new device type send me "full info:" the device from the log on sprut666666@gmail.com
- Removing devices from the form of the plugin is correct.
- You can remove the device directly to Homey, and everything will be deleted and HomeКit and the plugin will work correctly.
- Global optimization work with HomeKit a lot of fixes
- Improved stability fixed all possible crashes (For example, the application was not working and you removed the device)
- Check the availability of the devices
- Many other small additions and fixes
- Added many new types of devices and fixed old.

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

### Donate

For me [Sprut](https://github.com/sprut666666) PayPal: [![Donate](https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png)](https://paypal.me/sprut666666) or Yandex: [![Donate](https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png)](https://money.yandex.ru/to/410014789265242)

&&&&&

The first Creator [Swttt](https://github.com/swttt) PayPal: [![Donate](https://www.paypalobjects.com/webstatic/en_US/i/btn/png/btn_donate_92x26.png)](https://paypal.me/BasJansen)

---

### Changelog

#### 1.0.3
- Doorbell button (as Motion sensor)

#### 1.0.2
- Add full device info for debug

#### 1.0.1
- Support 2 bridges for example com.swttt.homekit

#### 1.0.0
- Initial release
