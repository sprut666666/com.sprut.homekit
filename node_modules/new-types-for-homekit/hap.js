var inherits = require('util').inherits;
var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;

var CommunityTypes = {};

// Characteristics
CommunityTypes.Volts = function() {
  Characteristic.call(this, 'Volts', CommunityTypes.Volts.UUID);
  this.setProps({
    format:   Characteristic.Formats.FLOAT,
    unit:     "V",
    minValue: 0,
    maxValue: 65535,
    minStep:  0.01,
    perms:    [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};
CommunityTypes.Volts.UUID = '00000001-000C-2000-8000-0026BB765291';
inherits(CommunityTypes.Volts, Characteristic);

CommunityTypes.Amperes = function() {
  Characteristic.call(this, 'Amps', CommunityTypes.Amperes.UUID);
  this.setProps({
    format:   Characteristic.Formats.FLOAT,
    unit:     "A",
    minValue: 0,
    maxValue: 65535,
    minStep:  0.01,
    perms:    [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};
CommunityTypes.Amperes.UUID = '00000002-000C-2000-8000-0026BB765291';
inherits(CommunityTypes.Amperes, Characteristic);

CommunityTypes.Watts = function() {
  Characteristic.call(this, 'Consumption', CommunityTypes.Watts.UUID);
  this.setProps({
    format:   Characteristic.Formats.FLOAT,
    unit:     "W",
    minValue: 0,
    maxValue: 65535,
    minStep:  0.01,
    perms:    [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};
CommunityTypes.Watts.UUID = '00000003-000C-2000-8000-0026BB765291';
inherits(CommunityTypes.Watts, Characteristic);

CommunityTypes.VoltAmperes = function() {
  Characteristic.call(this, 'Apparent Power', CommunityTypes.VoltAmperes.UUID);
  this.setProps({
    format:   Characteristic.Formats.FLOAT,
    unit:     "VA",
    minValue: 0,
    maxValue: 65535,
    minStep:  0.01,
    perms:    [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};
CommunityTypes.VoltAmperes.UUID = '00000004-000C-2000-8000-0026BB765291';
inherits(CommunityTypes.VoltAmperes, Characteristic);

CommunityTypes.KilowattHours = function() {
  Characteristic.call(this, 'Total Consumption', CommunityTypes.KilowattHours.UUID);
  this.setProps({
    format:   Characteristic.Formats.FLOAT,
    unit:     "kWh",
    minValue: 0,
    maxValue: 65535,
    minStep:  0.01,
    perms:    [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};
CommunityTypes.KilowattHours.UUID = '00000005-000C-2000-8000-0026BB765291';
inherits(CommunityTypes.KilowattHours, Characteristic);

CommunityTypes.KilowattVoltAmpereHour = function() {
  Characteristic.call(this, 'Apparent Energy', CommunityTypes.KilowattVoltAmpereHour.UUID);
  this.setProps({
    format:   Characteristic.Formats.FLOAT,
    unit:     "kVAh",
    minValue: 0,
    maxValue: 65535,
    minStep:  0.01,
    perms:    [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};
CommunityTypes.KilowattVoltAmpereHour.UUID = '00000006-000C-2000-8000-0026BB765291';
inherits(CommunityTypes.KilowattVoltAmpereHour, Characteristic);

CommunityTypes.CurrentAtmosphericPressure = function () {
  Characteristic.call(this, 'Barometric Pressure', CommunityTypes.CurrentAtmosphericPressure.UUID);
  this.setProps({
    format:   Characteristic.Formats.FLOAT,
    unit:     "mbar",
    minValue: 800,
    maxValue: 1200,
    minStep:  0.01,
    perms:    [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};
CommunityTypes.CurrentAtmosphericPressure.UUID = '00000007-000C-2000-8000-0026BB765291';
inherits(CommunityTypes.CurrentAtmosphericPressure, Characteristic);

CommunityTypes.CurrentNoiseLevel = function () {
  Characteristic.call(this, 'Noise Level', CommunityTypes.CurrentNoiseLevel.UUID);
  this.setProps({
    format:   Characteristic.Formats.FLOAT,
    unit:     "dB",
    minValue: 0,
    maxValue: 200,
    minStep:  0.01,
    perms:    [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
  });
  this.value = this.getDefaultValue();
};
CommunityTypes.CurrentNoiseLevel.UUID = '00000008-000C-2000-8000-0026BB765291';
inherits(CommunityTypes.CurrentNoiseLevel, Characteristic);

CommunityTypes.NoiseDetected = function() {
   Characteristic.call(this, "Noise Detected", CommunityTypes.Timestamp.UUID);
   this.setProps({
     format:   Characteristic.Formats.BOOL,
     perms: [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
   });
   this.value = this.getDefaultValue();
 };
 CommunityTypes.NoiseDetected.UUID = '00000009-000C-2000-8000-0026BB765291';
 inherits(CommunityTypes.NoiseDetected, Characteristic);

 CommunityTypes.CurrentUltraviolet = function() {
   Characteristic.call(this, 'Ultraviolet in UV index (UVI)', CommunityTypes.CurrentUltraviolet.UUID);
   this.setProps({
     format:   Characteristic.Formats.FLOAT,
     unit:     "UVI",
     minValue: 0,
     maxValue: 65535,
     minStep:  0.01,
     perms:    [Characteristic.Perms.READ, Characteristic.Perms.NOTIFY]
   });
   this.value = this.getDefaultValue();
 };
 CommunityTypes.CurrentUltraviolet.UUID = '00000010-000C-2000-8000-0026BB765291';
 inherits(CommunityTypes.CurrentUltraviolet, Characteristic);


// Service

CommunityTypes.PowerMeter = function (displayName, subtype) {
  Service.call(this, displayName, CommunityTypes.AtmosphericPressureSensor.UUID, subtype);

  // Optional Characteristics
  this.addOptionalCharacteristic(CommunityTypes.Volts);
  this.addOptionalCharacteristic(CommunityTypes.Amperes);
  this.addOptionalCharacteristic(CommunityTypes.Watts);
  this.addOptionalCharacteristic(CommunityTypes.VoltAmperes);
  this.addOptionalCharacteristic(CommunityTypes.KilowattHours);
  this.addOptionalCharacteristic(CommunityTypes.KilowattVoltAmpereHour);

  // Optional Characteristics standard
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.Name);
};
CommunityTypes.AtmosphericPressureSensor.UUID = '00000001-0000-2000-8000-0026BB765291';
inherits(CommunityTypes.AtmosphericPressureSensor, Service);

CommunityTypes.AtmosphericPressureSensor = function (displayName, subtype) {
  Service.call(this, displayName, CommunityTypes.AtmosphericPressureSensor.UUID, subtype);

  // Required Characteristics
  this.addCharacteristic(CommunityTypes.CurrentAtmosphericPressure);

  // Optional Characteristics standard
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.Name);
};
CommunityTypes.AtmosphericPressureSensor.UUID = '00000002-0000-2000-8000-0026BB765291';
inherits(CommunityTypes.AtmosphericPressureSensor, Service);

CommunityTypes.NoiseSensor = function (displayName, subtype) {
  Service.call(this, displayName, CommunityTypes.NoiseLevelSensor.UUID, subtype);

  // Required Characteristics
  this.addCharacteristic(CommunityTypes.NoiseDetected);

  // Optional Characteristics
  this.addOptionalCharacteristic(CommunityTypes.CurrentNoiseLevel);

  // Optional Characteristics standard
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.Name);
};
CommunityTypes.NoiseSensor.UUID = '00000003-0000-2000-8000-0026BB765291';
inherits(CommunityTypes.NoiseSensor, Service);

CommunityTypes.NoiseLevelSensor = function (displayName, subtype) {
  Service.call(this, displayName, CommunityTypes.NoiseLevelSensor.UUID, subtype);

  // Required Characteristics
  this.addCharacteristic(CommunityTypes.CurrentNoiseLevel);

  // Optional Characteristics standard
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.Name);
};
CommunityTypes.NoiseLevelSensor.UUID = '00000004-0000-2000-8000-0026BB765291';
inherits(CommunityTypes.NoiseLevelSensor, Service);

CommunityTypes.UltravioletSensor = function (displayName, subtype) {
  Service.call(this, displayName, CommunityTypes.NoiseLevelSensor.UUID, subtype);

  // Required Characteristics
  this.addCharacteristic(CommunityTypes.CurrentUltraviolet);

  // Optional Characteristics standard
  this.addOptionalCharacteristic(Characteristic.StatusActive);
  this.addOptionalCharacteristic(Characteristic.StatusFault);
  this.addOptionalCharacteristic(Characteristic.StatusLowBattery);
  this.addOptionalCharacteristic(Characteristic.StatusTampered);
  this.addOptionalCharacteristic(Characteristic.Name);
};
CommunityTypes.UltravioletSensor.UUID = '00000005-0000-2000-8000-0026BB765291';
inherits(CommunityTypes.UltravioletSensor, Service);

return CommunityTypes;
};
