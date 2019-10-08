import React from 'react';
import {Switch, Route} from "react-router-dom";
import Feed from "./components/userFeed/Feed";
import LoginAndRegister from "./components/bcrypt/loginAndRegister/LoginAndRegister";
import User from "./components/user/User";
import Chat from "./components/chat/Chat";
// import Test from "./components/test/Test";

export default (
    <Switch>
        <Route path="/Feed" component={Feed}/>
        <Route path="/user" component={User}/>
        <Route path="/chat" component={Chat}/>
        <Route exact path="/" component={LoginAndRegister}/>
    </Switch>
)