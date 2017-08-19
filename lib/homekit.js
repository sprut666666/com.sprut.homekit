'use strict'
const HAS = require('has-node');


function configServer(homey) {
  let server = {};

  // Config for server
  const config = new HAS.Config(homey.hostname, homey.wifi_mac, HAS.categories.bridge, '../userdata/homey.json', 8090, '200-20-200');
  server = new HAS.Server(config);

  // Create bridge
  const bridge = new HAS.Accessory(config.getHASID(homey.network.wlan0[0].mac));

  // What happens when a user presses identify in the Home app (Idea: add speech output?)
  const identify = HAS.predefined.Identify(1, undefined, function(value, callback) {
    callback(HAS.statusCodes.OK);
  });

  // Set device information for the bridge
  const manufacturer = HAS.predefined.Manufacturer(2, 'Athom');
  const model = HAS.predefined.Model(3, 'V1');
  const name = HAS.predefined.Name(4, 'Homey');
  const serialNumber = HAS.predefined.SerialNumber(5, '1337-1337-1337');
  const firmwareVersion = HAS.predefined.FirmwareRevision(6, '1.3.3.7');

  // Add all services to the created bridge accesory
  bridge.addServices(HAS.predefined.AccessoryInformation(1, [identify, manufacturer, model, name, serialNumber, firmwareVersion]));

  // Add bridge to the server
  server.addAccessory(bridge);
  server.onIdentify = identify.onWrite;
  console.log('Server config done.', 'success');
  // Return server to app.js
  return server;
}




function createDevice(device, id)
{

  let serviceNum = 1;
  let characteristicNum = 1;

  function map(inputStart, inputEnd, outputStart, outputEnd, input)
  {
    return outputStart + ((outputEnd - outputStart) / (inputEnd - inputStart)) * (input - inputStart);
  }

  function state2num(state)
  {
    if (state) {
      return 1;
    }
    else {
      return 0;
    }
  }

  function stateCover2num(state)
  {
    if (state=='up')
    {
      return 1;
    }
    else if(state=='down')
    {
      return 0;
    }else
    {
      return 2;
    }
  }
  function stateCover2proc(state)
  {
    if (state=='up')
    {
      return 0;
    }
    else if(state=='down')
    {
      return 100;
    }else
    {
      return 50;
    }
  }

  // New device
  const newDevice = new HAS.Accessory(id);

  // What happens when a user presses identify in the Home app (Idea: add speech output or blinking light?)

  const lightIdentify = HAS.predefined.Identify(characteristicNum++, undefined, function(value, callback) {

    callback(HAS.statusCodes.OK);
  });
  // Set light details
  const lightManufacturer = HAS.predefined.Manufacturer(characteristicNum++, device.driver.owner_name);
  const lightModel = HAS.predefined.Model(characteristicNum++, device.driver.id);
  const lightName = HAS.predefined.Name(characteristicNum++, device.name);
  const lightSerialNumber = HAS.predefined.SerialNumber(characteristicNum++, device.id);
  const lightFirmwareVersion = HAS.predefined.FirmwareRevision(characteristicNum++, '1.0.0');

  // Add services to the light
  newDevice.addServices(HAS.predefined.AccessoryInformation(serviceNum++, [lightIdentify, lightManufacturer, lightModel, lightName, lightSerialNumber, lightFirmwareVersion]));



  // Create empty capabilities array
  var capabilities = [];

  // If device has onoff capability
  if ('onoff' in device.capabilities)
  {


    if (device.class == 'fan')
    {
      let variable = state2num(device.state.onoff);

      var on = HAS.predefined.Active(characteristicNum++, variable, (value, callback) =>
      {
        console.log('Switching onoff for: ' + device.name + '. Value: ' +  value, "info");
        device.setCapabilityValue("onoff", value == 1);

        callback(HAS.statusCodes.OK);
      });
    }
    else
    {
      let variable = device.state.onoff;

      var on = HAS.predefined.On(characteristicNum++, variable, (value, callback) =>
      {
        console.log('Switching onoff for: ' + device.name + '. Value: ' +  value, "info");
        device.setCapabilityValue("onoff", value);

        callback(HAS.statusCodes.OK);
      });
    }
    // Switch the capability on user input


    // Push to array
    capabilities.push(on);// add services to light

    // If device has dim capability
    if ('dim' in device.capabilities)
    {
      // Switch the capability on user input
      var brightness = HAS.predefined.Brightness(characteristicNum++, device.state.dim * 100 || 1, (value, callback) =>
      {
        // Calling the api
        console.log('Switching dim for: ' + device.name + '. Value: ' +  value/100, "info");
        device.setCapabilityValue("dim", value / 100)
        callback(HAS.statusCodes.OK);
      });
      // Push to array
      capabilities.push(brightness);
    }
    // If device has hue capability
    if ('light_hue' in device.capabilities)
    {
      console.log('Found light_hue!', 'info');
      // Switch the capability on user input
      var hue = HAS.predefined.Hue(characteristicNum++, device.state.light_hue * 360 || 360, (value, callback) =>
      {
        // Calling the api
        // console.log("Hue: " + value / 360)
        console.log('Switching light_hue for: ' + device.name + '. Value: ' +  value/360, "info");
        device.setCapabilityValue("light_hue", value / 360)
        callback(HAS.statusCodes.OK);
      });

      // Push to array
      capabilities.push(hue);
    }

    // If device has sat capability
    if ('light_saturation' in device.capabilities)
    {
      // Switch the capability on user input
      var sat = HAS.predefined.Saturation(characteristicNum++, device.state.light_saturation * 100 || 100, (value, callback) =>
      {
        // Calling the api
        // console.log("Saturation: " + value / 100)
        console.log('Switching light_saturation for: ' + device.name + '. Value: ' +  value/100, "info");
        device.setCapabilityValue("light_saturation", value / 100)
        callback(HAS.statusCodes.OK);
      });

      // Push to array
      capabilities.push(sat);
    }

    if (!'light_saturation' in device.capabilities && !'light_hue' in device.capabilities && 'light_temperature' in device.capabilities)
    {
      // Switch the capability on user input
      var temp = HAS.predefined.Saturation(characteristicNum++, map(0, 1, 50, 400, device.state.light_temperature) || 400, (value, callback) =>
      {
        // Calling the api
        // console.log("Saturation: " + value / 100)
        console.log('Switching light_temperature for: ' + device.name + '. Value: ' +   map(50, 400, 0, 1, value), "info");
        device.setCapabilityValue("light_temperature", map(50, 400, 0, 1, value))
        callback(HAS.statusCodes.OK);
      });
      // Push to array
      capabilities.push(temp);
    }

    if (device.class == 'light')
    {
      newDevice.addServices(HAS.predefined.Lightbulb(serviceNum++, capabilities));
    }else if (device.class == 'fan')
    {
      newDevice.addServices(HAS.predefined.Fanv2(serviceNum++, capabilities));
    }
    else if(device.class == 'heater')
    {
      newDevice.addServices(HAS.predefined.Switch(serviceNum++, capabilities));
    }
    else
    {
      var inuse = HAS.predefined.OutletInUse(characteristicNum++, true, (value, callback) =>
      {
        // Calling the api
        callback(HAS.statusCodes.OK);
      });
      // Push to array
      capabilities.push(inuse);

      newDevice.addServices(HAS.predefined.Outlet(serviceNum++, capabilities));
    }

  }


  if ('locked' in device.capabilities)
  {

    var LockCurrentState = HAS.predefined.LockCurrentState(characteristicNum++, state2num(device.state.locked));
    capabilities.push(LockCurrentState);

    var LockTargetState = HAS.predefined.LockTargetState(characteristicNum++, state2num(device.state.locked), (value, callback) =>
    {
      // Calling the api
      // device.setCapabilityValue("locked")
      if (value == 1) {
        console.log('Switching locked for: ' + device.name + '. Value: ' +  true, "info");
        device.setCapabilityValue("locked", true)
      }
      else if (value == 0) {
        console.log('Switching locked for: ' + device.name + '. Value: ' +  false, "info");
        device.setCapabilityValue("locked", false)
      }
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(LockTargetState);

    newDevice.addServices(HAS.predefined.LockMechanism(serviceNum++, capabilities));
  }



  // If device has onoff capability
  if ('alarm_motion' in device.capabilities)
  {
    var motion = HAS.predefined.MotionDetected(characteristicNum++, device.state.alarm_motion || false);
    newDevice.addServices(HAS.predefined.MotionSensor(serviceNum++, [motion]));
  }

  if ('measure_humidity' in device.capabilities)
  {
    var currentRelativeHumidity = HAS.predefined.CurrentRelativeHumidity(characteristicNum++, device.state.measure_humidity || 0.1);
    newDevice.addServices(HAS.predefined.HumiditySensor(serviceNum++, [currentRelativeHumidity]));
  }

  if ('measure_luminance' in device.capabilities)
  {
    var lightSensor = HAS.predefined.CurrentAmbientLightLevel(characteristicNum++, device.state.measure_luminance || 0.1);
    newDevice.addServices(HAS.predefined.LightSensor(serviceNum++, [lightSensor]));
  }

  if ('measure_temperature' in device.capabilities)
  {
    var temperature = HAS.predefined.CurrentTemperature(characteristicNum++, device.state.measure_temperature || 0);
    newDevice.addServices(HAS.predefined.TemperatureSensor(serviceNum++, [temperature]));
  }

  if ('alarm_water' in device.capabilities)
  {
    var leakDetected = HAS.predefined.LeakDetected(characteristicNum++, state2num(device.state.alarm_water));
    newDevice.addServices(HAS.predefined.LeakSensor(serviceNum++, [leakDetected]));
  }

  if ('alarm_smoke' in device.capabilities)
  {
    var smokeDetected = HAS.predefined.SmokeDetected(characteristicNum++, state2num(device.state.alarm_smoke));
    newDevice.addServices(HAS.predefined.SmokeSensor(serviceNum++, [smokeDetected]));
  }

  if ('alarm_contact' in device.capabilities)
  {
    var contactSensorState = HAS.predefined.ContactSensorState(characteristicNum++, state2num(device.state.alarm_contact));
    newDevice.addServices(HAS.predefined.ContactSensor(serviceNum++, [contactSensorState]));
  }


  if ('windowcoverings_state' in device.capabilities)
  {

    //var LockCurrentState = HAS.predefined.LockCurrentState(characteristicNum++, state2num(device.state.locked));
    //capabilities.push(LockCurrentState);
    var currentPosition = HAS.predefined.CurrentPosition(characteristicNum++, stateCover2proc(device.state.windowcoverings_state), (value, callback) =>
    {
      // Calling the api
      console.log('1: ' + value);
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(currentPosition);

    var targetPosition = HAS.predefined.TargetPosition(characteristicNum++, stateCover2proc(device.state.windowcoverings_state), (value, callback) =>
    {
      // Calling the api

      if (value == 100)
      {
        console.log('Switching locked for: ' + device.name + '. Value: ' +  value, "info");
        device.setCapabilityValue("windowcoverings_state", 'down');
      }
      else if (value == 0)
      {
        console.log('Switching locked for: ' + device.name + '. Value: ' +  value, "info");
        device.setCapabilityValue("windowcoverings_state", 'up');
      }else
      {
        device.setCapabilityValue("windowcoverings_state", 'idle') ;
      }
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(targetPosition);

    var positionState = HAS.predefined.PositionState(characteristicNum++, stateCover2num(device.state.windowcoverings_state), (value, callback) =>
    {
      console.log('3: ' + value);
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(positionState);

    newDevice.addServices(HAS.predefined.WindowCovering(serviceNum++, capabilities));
  }



  device.on('$state', state =>
  {
    //console.log('Realtime event from: ' + device.name + '. Value: ' +  JSON.stringify(state), "info")

    if ('onoff' in device.capabilities)
    {
      let variable = false;
      if (device.class == 'fan')
      {
        variable = state2num(state.onoff);
      }else
      {
        variable = state.onoff;
      }

      if (on.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' onoff: ' + on.value + ' new: ' + variable);
        on.setValue(variable);
      }
    }

    if ('dim' in device.capabilities)
    {
      let variable = state.dim * 100;
      if (brightness.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' dim: ' + brightness.value + ' new: ' + variable);
        brightness.setValue(variable);
      }
    }

    if ('light_hue' in device.capabilities)
    {
      let variable = state.light_hue * 360;
      if (hue.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' light_hue: ' + hue.value + ' new: ' + variable);
        hue.setValue(variable);
      }
    }

    if ('light_saturation' in device.capabilities)
    {
      let variable = state.light_saturation * 100;
      if (sat.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' light_saturation: ' + sat.value + ' new: ' + variable);
        sat.setValue(variable);
      }
    }

    if (!'light_saturation' in device.capabilities && !'light_hue' in device.capabilities && 'light_temperature' in device.capabilities)
    {
      let variable = map(0, 1, 50, 400, state.light_temperature);
      if (temp.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' light_temperature: ' + temp.value + ' new: ' + variable);
        temp.setValue(variable);
      }

    }

    if ('alarm_motion' in device.capabilities)
    {
      let variable = state.alarm_motion;
      if (motion.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' alarm_motion: ' + motion.value + ' new: ' + variable);
        motion.setValue(variable);
      }
    }

    if ('measure_humidity' in device.capabilities)
    {
      let variable = state.measure_humidity;
      if (currentRelativeHumidity.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' measure_humidity: ' + currentRelativeHumidity.value + ' new: ' + variable);
        currentRelativeHumidity.setValue(variable);
      }
    }

    if ('measure_luminance' in device.capabilities)
    {
      let variable = state.measure_luminance;
      if (lightSensor.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' measure_luminance: ' + lightSensor.value + ' new: ' + variable);
        lightSensor.setValue(variable||0.1);
      }
    }

    if ('measure_temperature' in device.capabilities)
    {
      let variable = state.measure_temperature;
      if (temperature.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' measure_temperature: ' + temperature.value + ' new: ' + variable);
        temperature.setValue(variable);
      }
    }

    if ('alarm_water' in device.capabilities)
    {
      let variable = state2num(state.alarm_water);
      if (leakDetected.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' alarm_water: ' + leakDetected.value + ' new: ' + variable);
        leakDetected.setValue(variable);
      }
    }

    if ('alarm_smoke' in device.capabilities)
    {
      let variable = state2num(state.alarm_smoke);
      if (smokeDetected.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' alarm_smoke: ' + smokeDetected.value + ' new: ' + variable);
        smokeDetected.setValue(variable);
      }
    }

    if ('alarm_contact' in device.capabilities)
    {
      let variable = state2num(state.alarm_contact);
      if (contactSensorState.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' alarm_contact: ' + contactSensorState.value + ' new: ' + variable);
        contactSensorState.setValue(variable);
      }
    }

    if ('locked' in device.capabilities)
    {
      let variable = state2num(state.locked);
      if (LockCurrentState.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' locked: ' + LockCurrentState.value + ' new: ' + variable);
        LockCurrentState.setValue(variable);
      }
    }

    if ('windowcoverings_state' in device.capabilities)
    {
      let variable = stateCover2proc(device.state.windowcoverings_state);
      if (currentPosition.value != variable && variable != null)
      {
        console.log('Update: '+ device.name + ' currentPosition: ' + currentPosition.value + ' new: ' + variable);
        currentPosition.setValue(variable);
        targetPosition.setValue(variable);
        positionState.setValue(stateCover2num(device.state.windowcoverings_state));
      }
    }

  });


  console.log('serviceNum: '+ serviceNum);
  console.log('characteristicNum: '+ characteristicNum);

  return newDevice;

}


module.exports = {
  configServer: configServer,
  createDevice: createDevice
}
