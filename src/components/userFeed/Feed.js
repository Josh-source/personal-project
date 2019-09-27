import React from "react";
import NavBar from "../navBar/NavBar";
import Post from "../post/Post";
import Axios from "axios";
import {connect} from "react-redux";
import "./Feed.css";

class Feed extends React.Component {
    constructor() {
        super();
        this.state = {
            postInfo: "",
            postTitle:"",
            pastPost:[]
        }
    }
    componentDidMount(){
        this.fetchPost();
    }

    updatePastPost = postArr => {
        this.setState({pastPost: postArr});
    }

    fetchPost = () => {
        Axios.get("/api/users/post").then(response => {
            this.setState({pastPost: response.data})
        })
    }

    handleClick = e => {
        Axios.post("/api/post", {
            postInfo: this.state.postInfo,
            postTitle: this.state.postTitle,
            url: this.state.url
        })
        this.fetchPost();
    }

    checkUploadResult = (error, resultEvent) => {
        if (resultEvent.event === "success") {
            console.log("Picture uploaded successfully")
            console.log(resultEvent.info.url);
            this.setState({url: resultEvent.info.url});
        }
    };



    render() {
        // console.log(this.state.pastPosts);
        const widget = window.cloudinary.createUploadWidget(
            {
            cloudName: "friendZ0ne",
            uploadPreset: "l9unmmjr",
            sources: ["local", "url", "dropbox", "facebook", "instagram"]
            },
            (error, result) => {
            this.checkUploadResult(error, result);
            }
        );
        return (
            <>
            <div>
            <NavBar/>
            </div>

            <div className="addStuff">
                <input 
                className="title"
                placeholder="title" 
                onChange={e => this.setState({postTitle: e.target.value})}
                />


                <input
                className="info"
                placeholder="How you feeling?"
                onChange={e => this.setState({postInfo: e.target.value})}>
                </input>
                <div className= "main">
                    <div className= "upload">
                        <button onClick={() => widget.open()} className= "upload-button">Add Image</button>
                    </div>
                </div>


                <button
                onClick={this.handleClick}>Post!</button>
                <div
                style={{
                    "display": "flex",
                    "flexWrap": "wrap",
                    "width": "100vw"
                }}>
                    {this.state.pastPost.map(individualPost => {
                        console.log(individualPost);
                        return (
                        <>
                        
                            <Post
                            canEdit={individualPost.user_id === this.props.UserId}
                            postTitle={individualPost.title} 
                            postInfo={individualPost.info}
                            id={individualPost.post_id}
                            url={individualPost.url}
                            updatePastPost={this.updatePastPost}
                            />
                        
                        </>
                        )
                    })}
                </div>
            </div>
            </>
        )
    }
}

function mapStateToProps(reduxState) {
    console.log(reduxState);
    return ({
        UserId: reduxState.user.user_id
    })
}

export default connect(mapStateToProps)(Feed);