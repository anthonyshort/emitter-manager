# emitter-manager

Manager for component-emitter to easily add or remove events from groups of objects. This
is useful when you have groups of emitters, like models, and you want to easily remove
all of the events at once.

## Installation

    $ component install anthonyshort/emitter-manager

## API

The manager works very similar to `Emitter` except that `on` and `off` take an additional parameter, an emitter.

```js
var EmitterManager = require('emitter-manager');
var manager = new EmitterManager();
var emitter = new Emitter();
var emitter2 = new Emitter();

manager.on(emitter, 'foo', function(){
  // do something
});

manager.on(emitter2, 'foo', function(){
  // do something
});

manager.off();
```

The advantage of managing events this way is that when you destroy an object you can just call `#off` and it will
remove all event bindings on any objects that is is listening to. You can be specific about the events you want to remove.

```js
manager.off();
manager.off(model);
manager.off('foo');
manager.off('foo', callback);
manager.off(model, 'foo');
manager.off(model, 'foo', callback);
```

## License

  MIT
