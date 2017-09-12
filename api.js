'use strict';
const Homey = require('homey')

module.exports = [

  {
    method: 'GET',
    path: '/devices',
    fn: function(args, callback) {
      Homey.app.getDevices().then(res => {
          callback(null, res);
        })
        .catch(error => callback(error, null));

    }
  },
  {
    method: 'GET',
    path: '/log',
    fn: function(args, callback) {
          callback(null, Homey.app.getLog());

    }
  },
  {
    method: 'PUT',
    path: '/devices/add',
    fn: function(args, callback) {
      Homey.app.addDevice(args.body).then(res => {
          callback(null, true);
        })
        .catch(error => callback(error, null));

    }
  },
  {
    method: 'DELETE',
    path: '/devices/delete',
    fn: function(args, callback) {
      console.log('API call received, trying to remove ' + args.body.name, 'info');
      Homey.app.deleteDevice(args.body).then(res => {
          callback(null, true);
        })
        .catch(error => {
          console.log(err, 'error')
          callback(error, null);
        });

    }
  }
]
