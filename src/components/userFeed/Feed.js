import React from "react";
import NavBar from "../navBar/NavBar";
import Post from "../post/Post";
import Axios from "axios";


class Feed extends React.Component {
    state = {
        post:[]
    }
    componentDidMount(){
        Axios.get("/api/post").then(response => {
            this.setState({post: response.data});
        })
    }
    render() {
        return (
            <>
            <NavBar/>
            
            <div>
                <h1>
                    PostPage
                </h1>
            </div>
            </>
        )
    }
}

export default Feed;