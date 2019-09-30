import React from "react";
import NavBar from "../navBar/NavBar";

class User extends React.Component {
    // make an axios request to server
    //run a sql file that gets all of a given users posts
    //bring it back/store it in state
    //map over it
    //hardcode canEdit to true
    render() {
        return (
            <>
            <NavBar/>
            
            <div>
                <h1>
                    UserProfile
                </h1>
            </div>
            </>
        )
    }
}

export default User;