# redux-map-action-handlers

Want to use vanilla redux middleware, but want to keep it organized? This helper, inspired by redux-map-reducers, allows for creating a map that handles actions based on type, but still keeps the flexibility vanilla redux middleware offers.

## Installation

```bash
npm install redux-map-action-handlers
```

## Usage

Call `mapActionHandlers(handlers)` with the handler map to create the middleware:

```js
import { mapActionHandlers } from 'redux-map-action-handlers';

const todoMiddleware = mapActionHandlers({
  'ADD_TODO': addTodo,
  'REMOVE_TODO': removeTodo
});

async function addTodo(store, action) {
  // Handle side effects.
}

async function removeTodo(store, action) {
  // Handle side effects.
}
```

The action handlers will fire when the middleware receives the corresponding action. The handler get's the store and the action passed in as arguments. The handlers are *async* functions in this example, but this is **not** required.

> Handlers are fired **before** the next middleware is called, so synchronously calling `store.getState()` inside the handler will result in the state before the action is reduced.

You can add the middleware you created to redux like any other middleware:

```js
createStore(reducer, applyMiddleware(todoMiddleware));
```

## Custom middleware

`mapActionHandlers` handles everything for you, so there is not control over when the action handlers are called. This is a good default in most cases, but sometimes you want to do some initialization or handle some things after the state has been updated. Therefore a lower level function `createActionHandler(handlers)` is exposed.

```js
import { createActionHandler } from 'redux-map-action-handlers';

const handleAction = createActionHandler({
  'ADD_TODO': addTodo,
  'REMOVE_TODO': removeTodo
});

const customTodoMiddleware = store => {
  // Do initialization

  next => action => {
    handleAction(store, action);
    
    const result = next(action);

    // Do things with the updated state.

    return result
  }
}
```

This allows you create your own middleware while still having the advantage of organizing your action handlers. You could even create multiple action handlers to handle different actions after the state has updated.
