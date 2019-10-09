import React, {Component} from "react";
import NavBar from "../navBar/NavBar";
import "./Chat.css";
import {connect} from "react-redux";
import "../navBar/NavBar";

//socket
import  io from "socket.io-client";


class Chat extends Component  {
    constructor() {
        super();
        this.state={
            messages: [],
            userMessage: "",
            socket: io()
        }
    }
    componentDidMount() {
        this.state.socket.on("connection", () => {

        })
        this.state.socket.on("newMessage", data => {
            this.setState({messages: data});
        })
    }
    render(){
    return (
        <>
        <NavBar/>
            <div className="Chattting">
            <ul className="chat-list">
                {this.state.messages.map((val, i) => {
                    return <li key={i}>{val.username} : {val.message}</li>
                })}
            </ul>
            <input
            className="chat-input"
                onChange={e => this.setState({userMessage: (e.target.value)})}/>
            <button
                onClick={() => {
                this.state.socket.emit("messageSend", {message: this.state.userMessage, username: this.props.username})
            }}>
                Send Message
            </button>
        </div>
        </>
            );
        }  
}
function mapStateToProps(reduxState) {
    return ({
        username: reduxState.user.username
    })
}

export default connect(mapStateToProps
    )(Chat);

