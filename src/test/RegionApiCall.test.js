import RegionApiCall from "../components/RegionApiCall";
import React from "react";
import { shallow } from "enzyme";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducer";
import ReduxThunk from "redux-thunk";

const middlewares = [ReduxThunk];
const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};

const setUp = (initialState) => {
  const store = testStore(initialState);
  const wrapper = shallow(<RegionApiCall store={store} />)
    .childAt(0)
    .dive();
  return wrapper;
};

describe("Redux assessment unit test cases for RegionApiCall", () => {
  let wrapper;
  let regions = [
    { region: "asia", name: { common: "india" } },
    { region: "asia", name: { common: "pak" } },
    { region: "africa", name: { common: "east" } },
    { region: "africa", name: { common: "west" } },
  ];
  let initialState = {
    regions,
    error: null,
  };
  beforeEach(() => {
    wrapper = setUp(initialState);
  });

  window.alert = () => {}; 

  it("Should render without errors", () => {
    expect(wrapper.find({ id: "allElement" }).length).toBe(1);
  });

  it("Should render first dropdown", () => {
    expect(wrapper.find("select").length).toBe(1);
  });

  it(" first dropdown children ", () => {
    expect(wrapper.find("select").children().length).toBe(4);
  });

  it(" check handlecountries function called ", () => {
    wrapper.instance().handlecoutries = jest.fn();
    wrapper.find("select").simulate("change");
    expect(wrapper.instance().handlecoutries).toHaveBeenCalled();
  });

  it(" check secondDropdown function called ", () => {
    jest.spyOn(wrapper.instance(), "handlecoutries");
    wrapper.instance().secondDropdown = jest.fn();
    wrapper.instance().handlecoutries();
    expect(wrapper.instance().secondDropdown).toHaveBeenCalled();
  });

  it(" check existance of second select tag ", () => {
    const e = { target: { value: "asia" } };
    wrapper.instance().handlecoutries(e);
    expect(wrapper.find('select').length).toBe(2);
  });

  it(" check secondDropdown exist ", () => {
    const e = { target: { value: "asia" } };
    jest.spyOn(wrapper.instance(), "secondDropdown");
    wrapper.instance().secondDropdown(e);
    expect(wrapper.find('select').at(1).childAt(0).text()).toBe('india')
    // console.log('sec dro',wrapper.find('select').at(1).childAt(0).text());
    expect(wrapper.find({id:"countries"}).length).toEqual(1)
    expect(wrapper.instance().secondDropdown).toHaveBeenCalled();
  });

  it(" check componentDidMount function called ", () => {
    jest.spyOn(wrapper.instance(), "componentDidMount");
    wrapper.instance().componentDidMount();
    expect(wrapper.instance().componentDidMount).toHaveBeenCalledTimes(1);
  });
});

describe("error handling function ", () => {
  let wrapper;
  let regions = [
    { region: { asia: "india" } },
    { region: { asia: "pak" } },
    { region: { africa: "east" } },
    { region: { africa: "west" } },
  ];
  let initialState = {
    regions,
    error: "error in server",
  };
  wrapper = setUp(initialState);

  it("should update the state call errorhandler ", () => {
    wrapper.instance().errorHandler();
    expect(wrapper.state().errorInApi).toEqual("error in server");
  });

  it("should call errorhandler ", () => {
    jest.spyOn(wrapper.instance(), "errorHandler");
    wrapper.instance().handlecoutries();
    expect(wrapper.instance().errorHandler).toHaveBeenCalled();
  });
});






















// it(' check handlecountries functionality called ', () => {
//     // let props;
//     // props={
//     //     region:["asia",'africa']
//     // }
//     // let wrapper = shallow(<RegionApiCall  { ...props } />);
// jest.spyOn(wrapper.instance(),'handlecoutries')
// const err='server error';
// return wrapper.instance().handlecoutries();
//     // expect(wrapper.instance().handlecoutries).toHaveBeenCalled();

//     // wrapper.instance().handlecoutries();
//     // wrapper.find('select').simulate('change')
//     // expect(wrapper.instance().handlecoutries).toHaveBeenCalled();
// });

{/* {this.state.errorInApi && (
          <div style={{ color: "red", fontSize: "3rem" }}>
            Oops! 404 Not Found
            <br />
            Sorry,but Please ensure that the given url is correct!
          </div>
        )} */}
