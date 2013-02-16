var SimpleMap = require('map');

module.exports = {

  listenTo: function(obj, eventName, callback) {
    var listeners = this._listeners = this._listeners || new SimpleMap();
    var data = listeners.get(obj) || {};
    var callbacks = data[eventName] || ( data[eventName] = [] );
    obj.on(eventName, callback);
    callbacks.push(callback);
    listeners.set(obj, data);
  },

  stopListening: function(obj, name, callback) {
    var self = this;
    var objs = obj ? [obj] : this._listeners.keys();
    objs.forEach(function(obj){
      var data = self._listeners.get(obj);
      for (var event in data) {
        data[event].forEach(function(fn){
          obj.off(name || event, callback || fn);
        });
      }
    });
    return this;
  }

};