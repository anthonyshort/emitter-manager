var assert = require('component-assert');
var Emitter = require('component-emitter');
var Manager = require('emitter-manager');

describe('Manager', function() {
  var manager, emitter, emitter2, count;

  function increment() {
    count++;
  }

  function increment2() {
    count++;
  }

  beforeEach(function() {
    count = 0;
    emitter = new Emitter;
    emitter2 = new Emitter;
    manager = new Manager;
    manager.on(emitter, 'foo', increment);
    manager.on(emitter, 'foo', increment2);
    manager.on(emitter, 'bar', increment);
    manager.on(emitter2, 'foo', increment);
  });

  it('should listen to events', function() {
    emitter.emit('foo');
    emitter.emit('bar');
    emitter2.emit('foo');
    assert(count === 4);
  });

  it('should stop listening to all events', function() {
    manager.off();
    emitter.emit('foo');
    emitter.emit('bar');
    emitter2.emit('foo');
    assert(count === 0);
  });

  it('should stop listening to events on an object', function() {
    manager.off(emitter);
    emitter.emit('foo');
    emitter.emit('bar');
    emitter2.emit('foo');
    assert(count === 1);
  });

  it('should stop listening to events only by name', function(){
    manager.off('foo');
    emitter.emit('foo');
    emitter.emit('bar');
    emitter2.emit('foo');
    assert(count === 1);
  });

  it('should stop listening to events on an object for an event', function() {
    manager.off(emitter, 'foo');
    emitter.emit('foo');
    emitter.emit('bar');
    emitter2.emit('foo');
    assert(count === 2);
  });

  it('should stop listening with a specific callback', function() {
    manager.off(emitter, 'foo', increment);
    emitter.emit('foo');
    emitter.emit('bar');
    emitter2.emit('foo');
    assert(count === 3);
  });

  it('should stop listening with a name and callback', function() {
    manager.off('foo', increment);
    emitter.emit('foo');
    emitter.emit('bar');
    emitter2.emit('foo');
    assert(count === 2);
  });

  it('should not store the event data when the event has been removed', function(){
    emitter.off = increment;
    manager.off(emitter);
    assert(count === 3);
    manager.off(emitter);
    assert(count === 3);
  });

  describe('mixin', function(){
    var obj, em;
    beforeEach(function(){
      obj = {};
      Manager(obj);
      emitter = new Emitter;
    });

    it('should listen to an emitter', function(){
      obj.listenTo(emitter, 'foo', increment);
      emitter.emit('foo');
      assert(count === 1);
    });

    it('should stop listening to an emitter', function(){
      obj.listenTo(emitter, 'foo', increment);
      obj.stopListening(emitter);
      emitter.emit('foo');
      assert(count === 0);
    });

    it('should auto-bind callback', function(){
      obj.listenTo(emitter, 'foo', function(){
        this.foo = true;
      });
      emitter.emit('foo');
      assert(obj.foo === true);
    });

  });

  describe('context binding', function(){
    it('should listen', function(){
      emitter = new Emitter;
      var obj = { foo: false }
      manager.on(emitter, 'foo', function(){
        this.foo = true;
      }, obj);
      emitter.emit('foo');
      assert(obj.foo === true);
    });
    it('should stop listening', function(){
      emitter = new Emitter;
      var obj = { foo: false };
      var fn = function(){
        this.foo = true;
      };
      manager.on(emitter, 'foo', fn, obj);
      manager.off(emitter, 'foo', fn);
      emitter.emit('foo');
      assert(obj.foo === false);
    });
  });

});
