import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducer";
import ReduxThunk from "redux-thunk";
import { fetchregions } from "../action";
import moxios from "moxios";
import configureStore from 'redux-mock-store'

const middlewares = [ReduxThunk];
const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};

const mockStore = configureStore(middlewares);

describe("fetchPosts action", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('check action type ',()=>{
    const store = mockStore();

    it('should execute fetchregions ',()=>{
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: 'expectedState',
        });
      });

      return store.dispatch(fetchregions())
      .then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual('FETCH_REGIONS');
    })
    })

    it('should fetchregions dispatch error ',()=>{
      const errorResponse = {
        status: 400,
        response: { data:{ message: "invalid data" } },
      };
  
      const store = mockStore();
      moxios.wait(function () {
        let request = moxios.requests.mostRecent();
        request.reject(errorResponse);
      });
  

      return store.dispatch(fetchregions())
    .then(() => {
      const actions = store.getActions() 
      expect(actions[0].type).toEqual('ERROR');
    })
    })
  })

  test("Store is updated correctly", () => {
    const expectedState = [
      { region: "asia", name: { common: "india" } },
      { region: "asia", name: { common: "pak" } },
      { region: "africa", name: { common: "east" } },
      { region: "africa", name: { common: "west" } },
    ];
    const store = testStore();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedState,
      });
    });

    return store.dispatch(fetchregions()).then(() => {
      const newState = store.getState();
      expect(newState.regions).toBe(expectedState);
      expect(newState.error).toBe(null);
    });
  });

  it("Should reject the request", function () {
    const errorResponse = {
      status: 400,
      response: { data:{  message: "invalid data" },status: 400,
    },
    };

    const store = testStore();
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.reject(errorResponse);
    });

    return store.dispatch(fetchregions()).then(() => {
      const newState = store.getState();
      expect(newState.error).toEqual('invalid data with status 400 \n' +
      'Please ensure that the url is correct and try again');
    });
  });

  it("Should reject the request for network failure", function () {
    const errorResponse = {
      status: 500,
      response: false,
      message:'network error'
    };

    const store = testStore();
    moxios.wait(function () {
      let request = moxios.requests.mostRecent();
      request.reject(errorResponse);
    });

    return store.dispatch(fetchregions()).then(() => {
      const newState = store.getState();
      expect(newState.error).toEqual('network error \nPlease check Your network and try again');
    });
  });
});

