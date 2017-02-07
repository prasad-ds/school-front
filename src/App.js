import React, { Component } from 'react';
import Sum from './components/Sum/Sum';
import List from './components/List/List';
import CreateStudent from './components/CreateStudent/CreateStudent';
import CreateKlass from './components/CreateKlass/CreateKlass';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="container-fluid">
          <div className="row">
            <h1 className="header">Class Front</h1>
            <div className="col-lg-6">
              <CreateStudent host="http://localhost:9000" />
            </div>
            <div className="col-lg-6">
              <CreateKlass host="http://localhost:9000"  />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
