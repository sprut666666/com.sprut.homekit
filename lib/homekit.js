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
function aqi2AirQualityMainlandChina(state)
{
  if (state <= 50)
  {
    return 1;//EXCELLENT
  }
  else if(state <= 100)
  {
    return 2;//GOOD
  }
  else if(state <= 200)
  {
    return 3;//FAIR
  }
  else if(state <= 300)
  {
    return 4;//INFERIOR
  }
  else
  {
    return 5;//POOR
  }
}
function co2AirQuality(state)
{
  if (state <= 900)
  {
    return 1;//EXCELLENT
  }
  else if(state <= 1150)
  {
    return 2;//GOOD
  }
  else if(state <= 1400)
  {
    return 3;//FAIR
  }
  else if(state <= 1600)
  {
    return 4;//INFERIOR
  }
  else
  {
    return 5;//POOR
  }
}
function co2CarbonDioxideDetected(state)
{
  if (state > 1600)
  {
    return 1;//CO2_LEVELS_ABNORMAL
  }
  else
  {
    return 0;//CO2_LEVELS_NORMAL
  }
}
function targetTemperature2correct(state)
{
  if (state < 10)
  {
    return 10;
  }
  else if(state>38)
  {
    return 38;
  }else
  {
    return state;
  }
}
function targeTemperature2thermostatMode(state)
{
  if (state == 25)
  {
    return 1;
  }
  else if(state==20)
  {
    return 2;
  }else
  {
    return 3;
  }
}
function targeTemperature2currentThermostatMode(state)
{
  if (state == 25)
  {
    return 1;
  }
  else if(state==20)
  {
    return 2;
  }else
  {
    return 0;
  }
}


function thermostatMode2targetHeatingCoolingState(state)
{
  if (value == 'heat')
  {
    return 1;//heat
  }
  else if (value == 'cool')
  {
    return 2;//cool
  }
  else if (value == 'auto')
  {
    return 3;//auto
  }
  else
  {
    return 0;
  }
}

function thermostatMode2currentHeatingCoolingState(state)
{
  if (value == 'heat')
  {
    return 1;//heat
  }
  else if (value == 'cool')
  {
    return 2;//cool
  }
  else if (value == 'auto')
  {
    return 2;//cool
  }
  else
  {
    return 0;
  }
}

function vacuumcleaner2state(state)
{
  if (state == 'cleaning')
  {
    return true;//heat
  }
  else
  {
    return false;
  }
}


function alarmBattery(state)
{
  if (state <= 10 )
  {
    return 1;
  }
  else
  {
    return 0;
  }
}

function setOffForButton(onButton)
{
  onButton.setValue(false);
}

function updateStatus(device,variable,status,callback)
{
  if (device.available)
  {
    if (device.state[status] != variable && variable != null)
    {
      console.log(device.name + ': set ' + status + " = " + device.state[status] + " => " + variable, 'info');
      device.setCapabilityValue(status, variable);
    }
    callback(HAS.statusCodes.OK);
  }else
  {
    console.log(device.name + ': not available ', 'info');
    callback(HAS.statusCodes.busy);
  }

}

function updateStatusNoCallback(device,variable,status)
{
  if (device.state[status] != variable && variable != null)
  {
    console.log(device.name + ': set ' + status + " = " + device.state[status] + " => " + variable, 'info');
    device.setCapabilityValue(status, variable);
  }
}


function updateStatusOnHKNoNull(variable, deviceHK, status, device)
{
  if (deviceHK.value != variable)
  {
    console.log('Update: '+ device.name + ' ' + status + ': ' + deviceHK.value + ' new: ' + variable, "info");
    deviceHK.setValue(variable);
  }
}


function createDevice(device, id)
{
  //console.log('capabilities: '+ JSON.stringify(device.capabilities));
  //console.log('______________');
  //console.log('device: '+ JSON.stringify(device));

  let serviceNum = 1;
  let characteristicNum = 1;



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
  let capabilities = [];



  // If device has onoff capability
  if ('onoff' in device.capabilities)
  {


    if (device.class == 'fan')
    {
      let variable = state2num(device.state.onoff || false);

      var on = HAS.predefined.Active(characteristicNum++, variable, (value, callback) =>
      {
        updateStatus (device, value == 1, "onoff", callback);
      });
    }
    else
    {
      let variable = device.state.onoff || false;

      if ('dim' in device.capabilities)
      {
        var on = HAS.predefined.On(characteristicNum++, variable, (value, callback) =>
        {
          if (device.available)
          {
            setTimeout(updateStatusNoCallback, 1, device, value, "onoff", callback);
            callback(HAS.statusCodes.OK);
          }
          else
          {
            console.log(device.name + ': not available ', 'info');
            callback(HAS.statusCodes.busy);
          }

        });
      }else
      {
        var on = HAS.predefined.On(characteristicNum++, variable, (value, callback) =>
        {
          updateStatus (device, value, "onoff", callback);
        });
      }
    }
    // Push to array
    capabilities.push(on);// add services to light

    // If device has dim capability
    if ('dim' in device.capabilities)
    {
      var dimVariable = HAS.predefined.Brightness(characteristicNum++, Math.floor(device.state.dim * 100 || 100), (value, callback) =>
      {
        updateStatus (device, value / 100, "dim", callback);
      });
      capabilities.push(dimVariable);
    }
    // If device has hue capability
    if ('light_hue' in device.capabilities)
    {
      var hue = HAS.predefined.Hue(characteristicNum++, Math.floor(device.state.light_hue * 360 || 360), (value, callback) =>
      {
        updateStatus (device, Math.floor((value / 360)*100)/100, "light_hue", callback);
      });
      capabilities.push(hue);
    }

    // If device has sat capability
    if ('light_saturation' in device.capabilities)
    {
      var sat = HAS.predefined.Saturation(characteristicNum++, Math.floor(device.state.light_saturation * 100 || 100), (value, callback) =>
      {
        updateStatus (device, value / 100, "light_saturation", callback);
      });
      capabilities.push(sat);
    }

    if ('light_saturation' in device.capabilities == false && 'light_temperature' in device.capabilities)
    {
      var temp = HAS.predefined.Saturation(characteristicNum++, Math.floor(device.state.light_temperature * 100 || 100), (value, callback) =>
      {
        updateStatus (device, value / 100, "light_temperature", callback);
      });
      capabilities.push(temp);
    }

    if (device.class == 'light')
    {
      newDevice.addServices(HAS.predefined.Lightbulb(serviceNum++, capabilities));
      capabilities = [];
    }else if (device.class == 'fan')
    {
      newDevice.addServices(HAS.predefined.Fanv2(serviceNum++, capabilities));
      capabilities = [];
    }
    else if(device.class == 'heater')
    {
      newDevice.addServices(HAS.predefined.Switch(serviceNum++, capabilities));
      capabilities = [];
    }
    else
    {
      var inuse = HAS.predefined.OutletInUse(characteristicNum++, true, (value, callback) =>
      {
        callback(HAS.statusCodes.OK);
      });
      capabilities.push(inuse);

      newDevice.addServices(HAS.predefined.Outlet(serviceNum++, capabilities));
      capabilities = [];
    }

  }


  if ('locked' in device.capabilities)
  {

    var LockCurrentState = HAS.predefined.LockCurrentState(characteristicNum++, state2num(device.state.locked || false));
    capabilities.push(LockCurrentState);

    var LockTargetState = HAS.predefined.LockTargetState(characteristicNum++, state2num(device.state.locked || false), (value, callback) =>
    {
      updateStatus (device, value == 1, "locked", callback);
    });
    capabilities.push(LockTargetState);

    newDevice.addServices(HAS.predefined.LockMechanism(serviceNum++, capabilities));
    capabilities = [];
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

  if ('alarm_co2' in device.capabilities)
  {
    var carbonDioxideDetected = HAS.predefined.CarbonDioxideDetected(characteristicNum++, state2num(device.state.alarm_co2 || false) , (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(carbonDioxideDetected);
  }

  if ('measure_co2' in device.capabilities)
  {
    var airQuality = HAS.predefined.AirQuality(characteristicNum++, co2AirQuality(device.state.measure_co2 || 0));
    newDevice.addServices(HAS.predefined.AirQualitySensor(serviceNum++, [airQuality]));

    var carbonDioxideLevel = HAS.predefined.CarbonDioxideLevel(characteristicNum++, device.state.measure_co2 || 0, (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(carbonDioxideLevel);

    var сarbonDioxidePeakLevel = HAS.predefined.CarbonDioxidePeakLevel(characteristicNum++, 1600, (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(сarbonDioxidePeakLevel);

    if ('alarm_co2' in device.capabilities == false)
    {
      var carbonDioxideDetected = HAS.predefined.CarbonDioxideDetected(characteristicNum++, co2CarbonDioxideDetected(device.state.measure_co2 || 0) , (value, callback) =>
      {
        callback(HAS.statusCodes.OK);
      });
      capabilities.push(carbonDioxideDetected);
    }

    newDevice.addServices(HAS.predefined.CarbonDioxideSensor(serviceNum++, capabilities));
    capabilities = [];
  }



  if ('alarm_battery' in device.capabilities)
  {
    var statusLowBattery = HAS.predefined.StatusLowBattery(characteristicNum++, state2num(device.state.alarm_battery || false), (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(statusLowBattery);
  }


  if ('measure_battery' in device.capabilities)
  {
    var batteryLevel = HAS.predefined.BatteryLevel(characteristicNum++, device.state.measure_battery || 100, (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(batteryLevel);

    var chargingState = HAS.predefined.ChargingState(characteristicNum++, 2, (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(chargingState);

    if ('alarm_battery' in device.capabilities == false)
    {
      var statusLowBattery = HAS.predefined.StatusLowBattery(characteristicNum++, alarmBattery(device.state.measure_battery || 100), (value, callback) =>
      {
        callback(HAS.statusCodes.OK);
      });
      capabilities.push(statusLowBattery);
    }

    newDevice.addServices(HAS.predefined.BatteryService(serviceNum++, capabilities));
    capabilities = [];

  }


  if ('button' in device.capabilities)
  {
    var onButton = HAS.predefined.On(characteristicNum++, false, (value, callback) =>
    {
      device.setCapabilityValue("button", value);
      callback(HAS.statusCodes.OK);
      setTimeout(setOffForButton, 100, onButton);
    });
    newDevice.addServices(HAS.predefined.Switch(serviceNum++, [onButton]));
  }

  if ('speaker_playing' in device.capabilities)
  {
    var onSpeakerPlaying = HAS.predefined.On(characteristicNum++, device.state.speaker_playing || false, (value, callback) =>
    {
      updateStatus (device, value, "speaker_playing", callback);
    });
    capabilities.push(onSpeakerPlaying);

    var newName = HAS.predefined.Name(characteristicNum++, device.name + " (Play/Pause)");
    capabilities.push(newName);

    newDevice.addServices(HAS.predefined.Switch(serviceNum++, capabilities));
    capabilities = [];
  }

  if ('speaker_next' in device.capabilities)
  {
    var onSpeakerNext = HAS.predefined.On(characteristicNum++, false, (value, callback) =>
    {
      device.setCapabilityValue("speaker_next", value);
      callback(HAS.statusCodes.OK);
      setTimeout(setOffForButton, 100, onSpeakerNext);
    });
    capabilities.push(onSpeakerNext);

    var newName = HAS.predefined.Name(characteristicNum++, device.name + " (next)");
    capabilities.push(newName);

    newDevice.addServices(HAS.predefined.Switch(serviceNum++, capabilities));
    capabilities = [];
  }

  if ('speaker_prev' in device.capabilities)
  {
    var onSpeakerPrev = HAS.predefined.On(characteristicNum++, false, (value, callback) =>
    {
      device.setCapabilityValue("speaker_prev", value);
      callback(HAS.statusCodes.OK);
      setTimeout(setOffForButton, 100, onSpeakerPrev);
    });
    capabilities.push(onSpeakerPrev);

    var newName = HAS.predefined.Name(characteristicNum++, device.name + " (Prev)");
    capabilities.push(newName);

    newDevice.addServices(HAS.predefined.Switch(serviceNum++, capabilities));
    capabilities = [];
  }



  if ('measure_temperature' in device.capabilities)
  {
    var temperature = HAS.predefined.CurrentTemperature(characteristicNum++, device.state.measure_temperature || 0);
    if (device.class == 'thermostat')
    {
      capabilities.push(temperature);
    }
    else
    {
      newDevice.addServices(HAS.predefined.TemperatureSensor(serviceNum++, [temperature]));
    }

  }

  if ('alarm_water' in device.capabilities)
  {
    var leakDetected = HAS.predefined.LeakDetected(characteristicNum++, state2num(device.state.alarm_water || false));
    newDevice.addServices(HAS.predefined.LeakSensor(serviceNum++, [leakDetected]));
  }

  if ('alarm_smoke' in device.capabilities)
  {
    var smokeDetected = HAS.predefined.SmokeDetected(characteristicNum++, state2num(device.state.alarm_smoke || false));
    newDevice.addServices(HAS.predefined.SmokeSensor(serviceNum++, [smokeDetected]));
  }

  if ('alarm_contact' in device.capabilities)
  {
    var contactSensorState = HAS.predefined.ContactSensorState(characteristicNum++, state2num(device.state.alarm_contact || false));
    newDevice.addServices(HAS.predefined.ContactSensor(serviceNum++, [contactSensorState]));
  }

  if ('measure_aqi' in device.capabilities)
  {
    var airQuality = HAS.predefined.AirQuality(characteristicNum++, aqi2AirQualityMainlandChina(device.state.measure_aqi || 0));
    newDevice.addServices(HAS.predefined.AirQualitySensor(serviceNum++, [airQuality]));
  }


  if ('windowcoverings_state' in device.capabilities && 'dim' in device.capabilities == false)
  {
    var currentPosition = HAS.predefined.CurrentPosition(characteristicNum++, stateCover2proc(device.state.windowcoverings_state || 'idle'), (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(currentPosition);

    var dimVariable = HAS.predefined.TargetPosition(characteristicNum++, stateCover2proc(device.state.windowcoverings_state || 'idle'), (value, callback) =>
    {
      let variable = 'idle';
      if (value == 100)
      {
        variable = 'down';
      }
      else if (value == 0)
      {
        variable = 'up';
      }
      updateStatus (device, variable, "windowcoverings_state", callback);
    });
    capabilities.push(dimVariable);

    var positionState = HAS.predefined.PositionState(characteristicNum++, stateCover2num(device.state.windowcoverings_state || 'idle'), (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(positionState);

    newDevice.addServices(HAS.predefined.WindowCovering(serviceNum++, capabilities));
    capabilities = [];
  }else if (device.class == 'windowcoverings' && 'dim' in device.capabilities)
  {
    var currentPosition = HAS.predefined.CurrentPosition(characteristicNum++, device.state.dim*100 || 100, (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(currentPosition);

    var dimVariable = HAS.predefined.TargetPosition(characteristicNum++, device.state.dim*100 || 100, (value, callback) =>
    {
      updateStatus (device, value/100, "dim", callback);
    });
    capabilities.push(dimVariable);

    if ('windowcoverings_state' in device.capabilities)
    {
      var positionState = HAS.predefined.PositionState(characteristicNum++, stateCover2num(device.state.windowcoverings_state || 'idle'), (value, callback) =>
      {
        callback(HAS.statusCodes.OK);
      });
      capabilities.push(positionState);
    }
    else
    {
      var positionState = HAS.predefined.PositionState(characteristicNum++, 2, (value, callback) =>
      {
        callback(HAS.statusCodes.OK);
      });
      capabilities.push(positionState);

    }

    newDevice.addServices(HAS.predefined.WindowCovering(serviceNum++, capabilities));
    capabilities = [];

  }

  if ('thermostat_mode' in device.capabilities)
  {

    var targetHeatingCoolingState = HAS.predefined.TargetHeatingCoolingState(characteristicNum++,thermostatMode2targetHeatingCoolingState(device.state.thermostat_mode || 'cool') , (value, callback) =>
    {
      let variable = 'off';
      if (value == 1)
      {
        variable = 'heat';
      }
      else if (value == 2)
      {
        variable = 'cool';
      }
      else if (value == 3)
      {
        variable = 'auto';
      }

      updateStatus (device, variable, "thermostat_mode", callback);
    });

    var currentHeatingCoolingState = HAS.predefined.CurrentHeatingCoolingState(characteristicNum++, thermostatMode2currentHeatingCoolingState(device.state.thermostat_mode || 'cool'), (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(currentHeatingCoolingState);
  }

  if ('target_temperature' in device.capabilities)
  {

    if ('thermostat_mode' in device.capabilities == false)
    {
      var currentHeatingCoolingState = HAS.predefined.CurrentHeatingCoolingState(characteristicNum++, targeTemperature2currentThermostatMode(device.state.target_temperature || 20), (value, callback) =>
      {
        callback(HAS.statusCodes.OK);
      });
      capabilities.push(currentHeatingCoolingState);

      var targetHeatingCoolingState = HAS.predefined.TargetHeatingCoolingState(characteristicNum++, targeTemperature2thermostatMode(device.state.target_temperature || 20), (value, callback) =>
      {
        let variable = device.state.target_temperature;

        if (value == 1)
        {
          variable = 25;
        }
        else if (value == 2)
        {
          variable = 20;
        }
        else if (value == 3)
        {
          variable = 23;
        }

        updateStatus (device, variable, "target_temperature", callback);
      });

      capabilities.push(targetHeatingCoolingState);
    }

    var targetTemperature = HAS.predefined.TargetTemperature(characteristicNum++, targetTemperature2correct(device.state.target_temperature || 20), (value, callback) =>
    {
      updateStatus (device, (value > 28?28:value), "target_temperature", callback);
    });

    capabilities.push(targetTemperature);

    var temperatureDisplayUnits = HAS.predefined.TemperatureDisplayUnits(characteristicNum++, 0, (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(temperatureDisplayUnits);

    newDevice.addServices(HAS.predefined.Thermostat(serviceNum++, capabilities));
    capabilities = [];
  }

  if ('volume_mute' in device.capabilities)
  {
    var mute = HAS.predefined.Mute(characteristicNum++, device.state.volume_mute || false, (value, callback) =>
    {
      updateStatus (device, value, "volume_mute", callback);
    });
    capabilities.push(mute);
  }

  if ('volume_set' in device.capabilities)
  {
    var volume = HAS.predefined.Volume(characteristicNum++, device.state.volume_set * 100 || 10, (value, callback) =>
    {
      updateStatus (device, value / 100, "volume_set", callback);
    });
    capabilities.push(volume);

    if ('volume_mute' in device.capabilities == false)
    {
      var mute = HAS.predefined.Mute(characteristicNum++, device.state.volume_set == 0 || false, (value, callback) =>
      {
        updateStatus (device, (value ? 0: 20/100), "volume_set", callback);
      });
      capabilities.push(mute);
    }

    newDevice.addServices(HAS.predefined.Speaker(serviceNum++, capabilities));
    capabilities = [];
  }

  if ('vacuumcleaner_state' in device.capabilities)
  {
    var vacuumcOn = HAS.predefined.On(characteristicNum++, vacuumcleaner2state(device.state.vacuumcleaner_state || 'stopped'), (value, callback) =>
    {
      updateStatus (device, (value ? "cleaning": "docked"), "vacuumcleaner_state", callback);
    });
    capabilities.push(vacuumcOn);

    var inuse = HAS.predefined.OutletInUse(characteristicNum++, true, (value, callback) =>
    {
      callback(HAS.statusCodes.OK);
    });
    capabilities.push(inuse);

    newDevice.addServices(HAS.predefined.Outlet(serviceNum++, capabilities));
    capabilities = [];
  }


  device.on('$state', state =>
  {

    console.log('Realtime event from: ' + device.name + '. Value: ' +  JSON.stringify(state), "info");

    if (device.available)
    {
      if ('onoff' in device.capabilities)
      {
        let variable = state.onoff;

        if (variable != null)
        {
          if (device.class == 'fan')
          {
            variable = state2num(variable);
          }

          updateStatusOnHKNoNull(variable, on, "onoff", device);
        }
      }

      if ('dim' in device.capabilities)
      {
        let variable = state.dim;

        if (variable != null)
        {
          variable = Math.floor(variable * 100);

          updateStatusOnHKNoNull(variable, dimVariable, "dim", device);

          if(device.class == 'windowcoverings')
          {
            updateStatusOnHKNoNull(variable, currentPosition, "currentPosition", device);
          }
        }
      }

      if ('alarm_co2' in device.capabilities)
      {
        let variable = state.alarm_co2;

        if (variable != null)
        {
          updateStatusOnHKNoNull(state2num(variable), carbonDioxideDetected, "alarm_co2", device);
        }
      }

      if ('measure_co2' in device.capabilities)
      {
        let variable = state.measure_co2;

        if (variable != null)
        {
          updateStatusOnHKNoNull(variable, carbonDioxideLevel, "measure_co2", device);
          updateStatusOnHKNoNull(co2AirQuality(variable), airQuality, "airQuality", device);

          if ('alarm_co2' in device.capabilities == false)
          {
            updateStatusOnHKNoNull(co2CarbonDioxideDetected(variable), carbonDioxideDetected, "carbonDioxideDetected", device);
          }
        }
      }

      if ('volume_mute' in device.capabilities)
      {
        let variable = state.volume_mute;

        if (variable != null)
        {
          updateStatusOnHKNoNull(variable, mute, "volume_mute", device);
        }
      }

      if ('volume_set' in device.capabilities)
      {
        let variable = state.volume_set;

        if (variable != null)
        {
          variable = Math.floor(variable * 100);

          updateStatusOnHKNoNull(variable, volume, "volume_set", device);
          if ('volume_mute' in device.capabilities == false)
          {
            updateStatusOnHKNoNull(variable==0, mute, "mute", device);
          }
        }
      }

      if ('light_hue' in device.capabilities)
      {
        let variable = state.light_hue;

        if (variable != null)
        {
          variable = Math.floor(variable * 360);

          updateStatusOnHKNoNull(variable, hue, "light_hue", device);
        }
      }

      if ('light_saturation' in device.capabilities)
      {
        let variable = state.light_saturation;

        if (variable != null)
        {
          variable = Math.floor(variable * 100);

          updateStatusOnHKNoNull(variable, sat, "light_saturation", device);
        }
      }

      if ('light_saturation' in device.capabilities == false && 'light_temperature' in device.capabilities)
      {
        let variable = state.light_temperature;

        if (variable != null)
        {
          variable = Math.floor(variable * 100);

          updateStatusOnHKNoNull(variable, temp, "light_temperature", device);
        }
      }

      if ('alarm_motion' in device.capabilities)
      {
        let variable = state.alarm_motion;

        if (variable != null)
        {
          updateStatusOnHKNoNull(variable, motion, "alarm_motion", device);
        }
      }

      if ('measure_humidity' in device.capabilities)
      {
        let variable = state.measure_humidity;

        if (variable != null)
        {
          updateStatusOnHKNoNull(variable, currentRelativeHumidity, "measure_humidity", device);
        }
      }

      if ('measure_luminance' in device.capabilities)
      {
        let variable = state.measure_luminance;

        if (variable != null)
        {
          if (variable == 0)
          {
              variable = 0.1;
          }
          updateStatusOnHKNoNull(variable, lightSensor, "measure_luminance", device);
        }
      }


      if ('alarm_battery' in device.capabilities)
      {
        let variable = state.alarm_battery;

        if (variable != null)
        {
          variable = state2num(variable);
          updateStatusOnHKNoNull(variable, statusLowBattery, "alarm_battery", device);
        }
      }

      if ('measure_battery' in device.capabilities)
      {
        let variable = state.measure_battery;

        if (variable != null)
        {
          updateStatusOnHKNoNull(variable, batteryLevel, "measure_battery", device);

          if ('alarm_battery' in device.capabilities == false)
          {
            variable = alarmBattery(variable);
            updateStatusOnHKNoNull(variable, statusLowBattery, "statusLowBattery", device);
          }
        }
      }


      if ('measure_temperature' in device.capabilities)
      {
        let variable = state.measure_temperature;

        if (variable != null)
        {
          updateStatusOnHKNoNull(variable, temperature, "measure_temperature", device);
        }
      }

      if ('alarm_water' in device.capabilities)
      {
        let variable = state.alarm_water;

        if (variable != null)
        {
          variable = state2num(variable);

          updateStatusOnHKNoNull(variable, leakDetected, "alarm_water", device);
        }
      }

      if ('alarm_smoke' in device.capabilities)
      {
        let variable = state.alarm_smoke;

        if (variable != null)
        {
          variable = state2num(variable);

          updateStatusOnHKNoNull(variable, smokeDetected, "alarm_smoke", device);
        }
      }

      if ('measure_aqi' in device.capabilities)
      {
        let variable = state.measure_aqi;

        if (variable != null)
        {
          variable = aqi2AirQualityMainlandChina(variable);

          updateStatusOnHKNoNull(variable, airQuality, "measure_aqi", device);
        }
      }

      if ('alarm_contact' in device.capabilities)
      {
        let variable = state.alarm_contact;

        if (variable != null)
        {
          variable = state2num(variable);

          updateStatusOnHKNoNull(variable, contactSensorState, "alarm_contact", device);
        }
      }

      if ('locked' in device.capabilities)
      {
        let variable = state.locked;

        if (variable != null)
        {
          variable = state2num(variable);

          updateStatusOnHKNoNull(variable, LockCurrentState, "locked", device);
        }
      }

      if ('speaker_playing' in device.capabilities)
      {
        let variable = device.state.speaker_playing;

        if (variable != null)
        {
          updateStatusOnHKNoNull(variable, onSpeakerPlaying, "onSpeakerPlaying", device);
        }
        else
        {
          updateStatusOnHKNoNull(false, onSpeakerPlaying, "onSpeakerPlaying", device);
        }
      }

      if ('windowcoverings_state' in device.capabilities)
      {
        let variable = device.state.windowcoverings_state;

        if (variable != null)
        {
          variable = stateCover2proc(variable);

          updateStatusOnHKNoNull(variable, currentPosition, "currentPosition", device);
          updateStatusOnHKNoNull(variable, dimVariable, "dimVariable", device);
          //updateStatusOnHKNoNull(stateCover2num(device.state.windowcoverings_state), positionState, "positionState", device);
        }
      }


      if ('thermostat_mode' in device.capabilities)
      {
        let variable = device.state.thermostat_mode;

        if (variable != null)
        {
          variable = thermostatMode2targetHeatingCoolingState(variable);

          updateStatusOnHKNoNull(variable, targetHeatingCoolingState, "thermostat_mode", device);
          updateStatusOnHKNoNull(thermostatMode2currentHeatingCoolingState(device.state.thermostat_mode), currentHeatingCoolingState, "currentHeatingCoolingState", device);
        }
      }

      if ('target_temperature' in device.capabilities)
      {
        let variable = device.state.target_temperature;

        if (variable != null)
        {
          variable = targetTemperature2correct(variable);

          updateStatusOnHKNoNull(variable, targetTemperature, "target_temperature", device);

          if ('thermostat_mode' in device.capabilities == false)
          {
            updateStatusOnHKNoNull(targeTemperature2currentThermostatMode(variable), currentHeatingCoolingState, "currentHeatingCoolingState", device);
            updateStatusOnHKNoNull(targeTemperature2thermostatMode(variable), targetHeatingCoolingState, "targetHeatingCoolingState", device);
          }
        }
      }

      if ('vacuumcleaner_state' in device.capabilities)
      {
        let variable = state.vacuumcleaner_state;

        if (variable != null)
        {
          variable = vacuumcleaner2state(variable);

          updateStatusOnHKNoNull(variable, vacuumcOn, "vacuumcleaner_state", device);
        }
      }

    }else
    {
      console.log(device.name + ': not available ', 'info');
    }
  });

  return newDevice;

}


module.exports = {
  configServer: configServer,
  createDevice: createDevice
}
