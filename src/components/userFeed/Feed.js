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
            pastPost:[],
            makePost:false
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

    handlePostClick = e => {
        this.setState({makePost: true});
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

            <div>
                <div>
                    <button
                    className="post-maker"
                    >Create Post</button>
                    
                    <div className="make-post">
                        <input 
                        className="title"
                        placeholder="How you Feel?" 
                        onChange={e => this.setState({postTitle: e.target.value})}
                        />

                        {/* <input
                        className="info"
                        placeholder="How you feeling?"
                        onChange={e => this.setState({postInfo: e.target.value})}>
                        </input> */}
                        <div className= "main">
                            <div className= "upload-buttons">
                                <button onClick={() => widget.open()} className= "upload-button">Add Image</button>
                            </div>
                        </div>


                        <button
                        className="post-button"
                        onClick={this.handleClick}>Post!</button>

                    </div>
                <div
                style={{
                    "display": "flex",
                    "flexWrap": "wrap",
                    "width": "100vw"
                }}>
                </div>
                    {this.state.pastPost.map(individualPost => {
                        console.log(individualPost);
                        return (
                        <>
                        
                            <Post
                            canEdit={individualPost.user_id === this.props.UserId}
                            postTitle={individualPost.title} 
                            // postInfo={individualPost.info}
                            id={individualPost.post_id}
                            url={individualPost.url}
                            updatePastPost={this.updatePastPost}
                            username={individualPost.username}
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
        UserId: reduxState.user.user_id,
        username: reduxState.user.username
    })
}

export default connect(mapStateToProps)(Feed);