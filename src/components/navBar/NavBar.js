import React from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import {connect} from "react-redux";
import {updateUser} from "../../redux/reducers/userReducer";

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            shouldRedirect:false
        }
    }
    logOut = () => {
        axios.get('/auth/logOut').then(() => {
            this.props.updateUser({})
            this.setState({shouldRedirect: true})
        }).catch(err => console.log(err));
    }


    render(){
    return (
        <nav>
            <h1 className="navigation">
                <Link to= "/chat">
                    <button>CHAT</button>
                </Link>

                <Link to="/Feed">
                    <button>FEED</button>
                </Link>

                <Link to= "/User">
                    <button>PROFILE</button>
                </Link>

                <Link to="/">
                    <button>LOGOUT</button>
                </Link>
            </h1>
        </nav>
    )
}
}


export default connect(undefined, {
    updateUser
})(NavBar)