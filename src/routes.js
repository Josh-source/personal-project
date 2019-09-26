import React from 'react';
import {Switch, Route} from "react-router-dom";
import Feed from "./components/userFeed/Feed";
import LoginAndRegister from "./components/bcrypt/loginAndRegister/LoginAndRegister";
import User from "./components/user/User";
// import Test from "./components/test/Test"
// import Chat from "./components/chat/Chat";

export default (
    <Switch>
        {/* <Route path="/Test" component={Test}/> */}
        {/* <Route path="/Chat" component={Chat}/> */}
        <Route path="/Feed" component={Feed}/>
        <Route path="/user" component={User}/>
        <Route exact path="/" component={LoginAndRegister}/>
    </Switch>
)