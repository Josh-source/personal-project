import React, {Component} from "react";
import NavBar from "../navBar/NavBar";
import "./Chat.css";
import {connect} from "react-redux";
import "../navBar/NavBar";
// import {updateUser} from "../../redux/reducers/userReducer";

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
        // this.props.updateUser()
        this.state.socket.on("connection", () => {

        })
        this.state.socket.on("newMessage", data => {
            console.log("here");
            this.setState({messages: data});
        })
    }
    render(){
        console.log(this.props);
    return (
        <>
        <NavBar/>
            <div className="Chattting">
            <ul className="chat-list">
                {this.state.messages.map((val, i) => {
                    console.log(val);
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
    console.log(reduxState);
    return ({
        username: reduxState.user.username
    })
}

export default connect(mapStateToProps
    // , {updateUser}
    )(Chat);

