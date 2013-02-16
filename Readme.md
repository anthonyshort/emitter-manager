
# listener

  Inverse event binding for component-emitter. This allows you to properly manage event bindings with Emitter. Based on Backbone's listenTo method. It is essentially a manager for events you bind with Emitter so that you can easily remove the events you you destroy the object. Imagine that you have a view listening to model and when a view is destroy you want to remove any callbacks on that model for that view. This makes that job a little bit easier.

## Installation

    $ component install anthonyshort/listener

## API

Listener is just an object so you can mix it into any object.

    var listener = require('listener');
    var View = require('view');
    var extend = require('extend');
    var Model = require('model');

    extend(View.prototype, listener);

    var view = new View();
    var model = new Model();

    view.listenTo(model, 'foo', function(){
      // do something
    });

The advantage of managing events this way is that when you destroy an object you can just call `#stopListening` and it will
remove all event bindings on any objects that is is listening to. You can be specific about the events you want to remove.

    view.stopListening();
    view.stopListening(model);
    view.stopListening(model, 'foo');
    view.stopListening(model, 'foo', callback);

## License

  MIT
