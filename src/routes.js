import React from 'react';
import {Switch, Route} from "react-router-dom";
import Feed from "./components/userFeed/Feed";
import LoginAndRegister from "./components/bcrypt/loginAndRegister/LoginAndRegister";
import User from "./components/user/User";

export default (
    <Switch>
        <Route path="/Feed" component={Feed}/>
        <Route path="/user" component={User}/>
        <Route exact path="/" component={LoginAndRegister}/>
    </Switch>
)