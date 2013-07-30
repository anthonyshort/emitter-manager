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

  describe('mixin', function(){
    var obj, em;
    beforeEach(function(){
      obj = {};
      Manager(obj);
    });

    it('should listen to an emitter', function(){
      emitter = new Emitter;
      obj.listenTo(emitter, 'foo', increment);
      emitter.emit('foo');
      assert(count === 1);
    });

    it('should stop listening to an emitter', function(){
      emitter = new Emitter;
      obj.listenTo(emitter, 'foo', increment);
      obj.stopListening(emitter);
      emitter.emit('foo');
      assert(count === 0);
    });

  });

});
