const { mapActionHandlers, createActionHandler } = require('./index');

const storeMock = {};
const TEST_ACTION_TYPE = 'TEST_ACTION_TYPE';
const OTHER_ACTION_TYPE = 'OTHER_ACTION_TYPE';
const testAction = { type: TEST_ACTION_TYPE };
const otherAction = { type: OTHER_ACTION_TYPE };

let testHandler;

beforeEach(() => {
  testHandler = jest.fn();
});

describe('mapActionHandlers()', () => {
  let middleware, nextMock;

  beforeEach(() => {
    nextMock = jest.fn();
    middleware = mapActionHandlers({
      [TEST_ACTION_TYPE]: testHandler
    });
  });

  test('Calls the correct action handler.', () => {
    middleware(storeMock)(nextMock)(testAction);
  
    expect(testHandler).toBeCalledWith(storeMock, testAction);
  });

  test('Calls the next middleware.', () => {
    middleware(storeMock)(nextMock)(testAction);
  
    expect(nextMock).toBeCalledWith(testAction);
  });

  test('Does not call a handler when the action is not handled.', () => {
    middleware(storeMock)(nextMock)(otherAction);
  
    expect(testHandler).not.toBeCalled();
  });

  test('Calls the next middleware when the action is not handled.', () => {
    middleware(storeMock)(nextMock)(otherAction);
  
    expect(nextMock).toBeCalledWith(otherAction);
  });
});

describe('createActionHandler()', () => {
  let handleAction;

  beforeEach(() => {
    handleAction = createActionHandler({
      [TEST_ACTION_TYPE]: testHandler
    });
  });
  
  test('Calls the correct action handler.', () => {
    handleAction(storeMock, testAction);
  
    expect(testHandler).toBeCalledWith(storeMock, testAction);
  });
  
  test('Ignores a non handled action.', () => {
    handleAction(storeMock, otherAction);

    expect(testHandler).not.toBeCalled();
  });
});
