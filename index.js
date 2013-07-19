var HashMap = require('map');

function Manager(obj) {
  this._events = new HashMap();
}

Manager.prototype.on = function(obj, type, fn) {
  var data = this._events.get(obj) || {};
  var fns = data[type] || (data[type] = []);
  obj.on(type, fn);
  fns.push(fn);
  this._events.set(obj, data);
};

Manager.prototype.off = function(obj, name, fn) {
  var events = this._events;
  if(typeof name === 'function') {
    fn = name;
  }
  if(typeof obj === 'string') {
    name = obj;
    obj = null;
  }
  var objs = obj ? [obj] : this._events.keys();
  objs.forEach(function(emitter){
    var data = events.get(emitter);
    for (var eventName in data) {
      data[eventName].forEach(function(callback){
        if(fn && callback !== fn) return;
        emitter.off(name || eventName, callback);
      });
    }
  });
};

module.exports = Manager;