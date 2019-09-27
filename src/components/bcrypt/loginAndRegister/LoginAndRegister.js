import React from "react";
//package
import axios from "axios";
//routing
import {Redirect} from "react-router-dom";
//redux
import {connect} from "react-redux";
import {updateUser} from "../../../redux/reducers/userReducer";
//css
import "./LoginAndRegister.css";

class LoginAndRegister extends React.Component {
    constructor() {
        super();
        this.state={
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
            clickedRegister:false,
            triedToClick:false,
            shouldRedirect:false,
            serverErrorMessage: ""
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleRegisterClick = () => {
        const {username,password,email, firstName,lastName} = this.state;
        console.log(username);
        if(username !== "" && password !== "" && email !== "" && firstName !== "" && lastName !== "") {
            axios.post("/auth/register", {
                username,password,email,firstName,lastName
            }).then(response => {
                this.props.updateUser({username, email, firstName, lastName});
                this.setState({shouldRedirect: true});
            }).catch(error => {
            this.setState({serverErrorMessage: error.response.data .error});
            })
        } else {
            this.setState({triedToClick: true})
        }
    }
    



    handleLoginClick = e => {
        const {username, password} = this.state;
        if(username === "" && password === "") {
            this.setState({triedToClick: true});
        } else {
            axios.post("/auth/login", {
                username, password
            }).then(response => {
                this.props.updateUser(response.data);
                this.setState({shouldRedirect: true});
            }).catch(error => {
                this.setState({serverErrorMessage: error.response.data.error});
            })
        }
    }
    render(){
        if(this.state.shouldRedirect === true ) {
            return <Redirect to="/Feed" />
        }
        return(
            <>
            <body className="home">
                <div className="body">
                    {this.state.triedToClick === true ? <h1>Please Fill in all the Fields</h1> : null}
                    {this.state.serverErrorMessage !== "" ? <h1>{this.state.serverErrorMessage}</h1> : null}
                    <div className="login-field">
                    <input
                    className="UsernameField"
                    placeholder="Username"
                    name="username"
                    onChange={this.handleChange}
                    />
                    <input
                    className="PasswordField"
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    />
                    </div>
                    
                </div>
                <ul className="ul">
                <button className="Login"
                onClick={this.handleLoginClick}
                >LOGIN</button>
                
                <button className="Register"
                onClick={() => this.setState({clickedRegister: !this.state.clickedRegister})}
                >
                    {this.state.clickedRegister === true ? "CANCEL" : "REGISTER"}
                </button>
                </ul>
                {
                    this.state.clickedRegister === true ?
                    <>
                    <div className="hidden-field">
                    <div className="register-dropdown">
                        <input
                        className="first-name"
                        placeholder="First Name"
                        name="firstName"
                        onChange={this.handleChange}
                        />
                        <input
                        className="last-name"
                        placeholder="Last Name"
                        name="lasttName"
                        onChange={this.handleChange}
                        />
                        <input
                        className="email"
                        placeholder="Email"
                        name="email"
                        onChange={this.handleChange}
                        />
                    </div>
                    <button 
                    className="submit"
                    onClick={this.handleRegisterClick}
                    >SIGN UP!</button>
                    </div>
                    </>
                :
                null
                }
                <div className="header-text">
                <h1 className="friend">Friend(</h1><h1 class="halfStyle" data-content="s">s</h1><h1 id="zone">)Zone</h1>
                </div>
            </body>
            </>
        )
    }
}

export default connect(undefined, {
    updateUser
} )(LoginAndRegister);