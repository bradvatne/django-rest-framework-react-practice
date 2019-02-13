import React, { Component } from "react";
import "./App.css";
import "antd/dist/antd.css";
import CustomLayout from "./containers/Layout.js";
import BaseRouter from './Routes.js';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <CustomLayout>
          <BaseRouter/>
        </CustomLayout>
      </Router>
      </div>
    );
  }
}

export default App;
