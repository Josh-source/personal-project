import React, {Component} from "react";
import NavBar from "../navBar/NavBar";
import Axios from "axios";
import {connect} from 'react-redux';
import "./User.css";
import {userPosts} from "../../redux/reducers/userReducer";


class User extends Component{
    constructor(props){
        super(props);
        this.state={
            inEditStatus: false,
            username: "",
            email: "",
            usersPosts: []
        }
    }

    componentDidMount() {
        Axios.get("/api/user/posts").then(response => {
            console.log(response.data);
            this.setState({
                usersPosts: response.data
            })
        })
    }

    handleClick= e => {
        Axios.put(`/api/users/`, {
            username:this.props.username,
            email:this.props.email
        }).then(response => {
            console.log(response);
            this.props.editUser(response.data);
        })
    }
    handleDeleteUser = () => {

    }
    
    render() {
        console.log(this.props)
        return (
            <>
            <NavBar/>
            
            <div>
                <h1 className="user-username">
                    {this.props.username}
                </h1>
            </div>
            <div className="update-user">
                <input
                className="username-edit"
                placeholder="  EDIT USERNAME"
                defaultValue={this.state.username}
                onChange={e => this.setState({username: e.target.value})}
                />
                <input
                className="email-edit"
                placeholder="EDIT EMAIL"
                defaultValue={this.props.email}
                onChange={e => this.setState({email: e.target.value})}
                />
                <button
                className="save-changes"
                onClick={this.handleClick}>Save Changes</button>
            </div>
            <div>
                {this.state.usersPosts.map(posts => {
                    console.log(posts);
                    return (
                        <>
                        <div className="flip-cards">
                            <h6 >{posts.title}</h6>
                            <img className="image-content" src={posts.url}></img>
                        </div>
                        </>
                    )
                })}
            </div>
            </>
        )
    }
}

function mapStateToProps(reduxState) {
    console.log(reduxState.user.username);
    return ({
        UserId: reduxState.user.user_id,
        username: reduxState.user.username
        // usersPosts: reduxState.user.usersPosts
    })
}

export default connect(mapStateToProps)(User);
//run a sql file that gets all of a given users posts
//bring it back/store it in state
//map over it
//hardcode canEdit to true