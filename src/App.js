import React, { Component } from 'react';
import Sum from './components/Sum/Sum'
import List from './components/List/List'
class App extends Component {
  render() {
    return (
      <div className="app">
        {/*<h1 className="header">Class Front</h1>
        <Sum />*/}
        <List />
      </div>
    );
  }
}


export default App;
