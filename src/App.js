import React from 'react';
import './App.css';

import axios from "axios";

import routes from "./routes";


import {connect} from "react-redux";
import {updateUser} from "./redux/reducers/userReducer";


class App extends React.Component{
  componentDidMount() {
    axios.get("/auth/user").then(response => {
      this.props.updateUser(response.data);
    })
  }
  render() {
    return (
      <>
      {routes}
        <div className="App">
      </div>
      </>
    );
  }
}

export default connect(undefined, {updateUser})(App);
