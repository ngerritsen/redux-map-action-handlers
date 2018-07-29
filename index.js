'use strict';

/** 
 * @param {Object.<Function>} handlers
 * @returns {Function}
 */
function mapActionHandlers(handlers) {
  const handleAction = createActionHandler(handlers);

  return store => next => action => {
    handleAction(store, action);
    return next(action);
  }
}

/** 
 * @param {Object.<Function>} handlers
 * @returns {Function}
 */
function createActionHandler(handlers) {
  return (store, action) => {
    const handler = handlers[action.type];

    if (typeof handler === 'function') {
      handler(store, action);
    }
  };
}

module.exports = {
  createActionHandler,
  mapActionHandlers
}
