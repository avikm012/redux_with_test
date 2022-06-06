import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux';
import store from './store';
import RegionApiCall from './components/RegionApiCall';

// store.subscribe(()=>console.log(store.getState())) ; 
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="App" >
      <header role="banner" className="App-header">
        <h1>
       Region Api Call
       </h1>
      </header>
      <RegionApiCall/>

    </div>
    </Provider>
    )
  }
}

export default App;