describe 'Listener', ->
  expect = chai.expect
  Emitter = require 'component-emitter' 
  listener = require 'listener'

  beforeEach ->
    @emitter = new Emitter
    @listener = Object.create(listener)

  it 'should listen to events', ->
    matched = false
    @listener.listenTo @emitter, 'foo', -> matched = true
    @emitter.emit 'foo'
    expect(matched).to.equal(true)

  it 'should stop listening to all events', ->
    foo = bar = false
    @listener.listenTo @emitter, 'foo', -> foo = true
    @listener.listenTo @emitter, 'bar', -> bar = true
    @listener.stopListening()
    @emitter.emit 'foo'
    @emitter.emit 'bar'
    expect(foo).to.equal(false)
    expect(bar).to.equal(false)

  it 'should stop listening to events on an object', ->
    foo = bar = false
    @listener.listenTo @emitter, 'foo', -> foo = true
    @listener.listenTo @emitter, 'bar', -> bar = true
    @listener.stopListening @emitter
    @emitter.emit 'foo'
    @emitter.emit 'bar'
    expect(foo).to.equal(false)
    expect(bar).to.equal(false)

  it 'should stop listening to events on an object for an event', ->
    foo = bar = false
    @listener.listenTo @emitter, 'foo', -> foo = true
    @listener.listenTo @emitter, 'bar', -> bar = true
    @listener.stopListening @emitter, 'foo'
    @emitter.emit 'foo'
    @emitter.emit 'bar'
    expect(foo).to.equal(false)
    expect(bar).to.equal(true)

  it 'should stop listening with a specific callback', ->
    foo = bar = baz = false
    callback = -> foo = true
    @listener.listenTo @emitter, 'foo', callback
    @listener.listenTo @emitter, 'foo', -> baz = true
    @listener.listenTo @emitter, 'bar', -> bar = true
    @listener.stopListening @emitter, 'foo', callback
    @emitter.emit 'foo'
    @emitter.emit 'bar'
    expect(foo).to.equal(false)
    expect(bar).to.equal(true)
    expect(baz).to.equal(true)