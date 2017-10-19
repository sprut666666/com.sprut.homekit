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
  },
  {
    method: 'GET',
    path: '/users',
    fn: function(args, callback) {
      Homey.app .getUsers()
                .then(res => callback(null, res))
                .catch(callback);
    }
  },
  {
    method: 'PUT',
    path: '/users',
    fn: function(args, callback) {
      let user = args.body;
      console.log('API call received, trying to track ' + user.name, 'info');
      Homey.app .trackUser(user)
                .then(res => callback(null, true))
                .catch(callback);
    }
  },
  {
    method: 'DELETE',
    path: '/users',
    fn: function(args, callback) {
      let user = args.body;
      console.log('API call received, trying to untrack ' + user.name, 'info');
      Homey.app .unTrackUser(user)
                .then(res => callback(null, true))
                .catch(callback);
    }
  },
]
