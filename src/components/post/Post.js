import React from "react";
import axios from 'axios';
import "./Post.css";

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            inEditStatus: false,
            inputFieldText: "",
            // textArea: "",
            gallery: [],
            image_url:""
        }
    }
    handleClick = e => {
        this.setState({inEditStatus:false});console.log(this.props.id);
        axios.put(`/api/post/${this.props.id}`, {
            title:this.state.inputFieldText,
            // info: this.state.textArea
        }).then(response => {
            console.log(response);
            this.props.updatePastPost(response.data);
        })
    }
    handleDelete = () => {
        console.log(this.props.id, typeof this.props.id);
        axios.delete(`/api/post/${this.props.id}`).then(response => {
            this.props.updatePastPost(response.data);
        })
    }


    render() {
        
        return (
            <div className="body">
            <>
            <div
            className="flip-card"
            >
                {
                
                    this.state.inEditStatus === false ?
                <>
                <>
                    <h3 className="username">{this.props.username}</h3>
                    <img className="image-content" src={this.props.url} />
                </>
                <>
                    <h1 className="post-title">{this.props.postTitle}</h1>
                    {/* <h2 className="post-info">{this.props.postInfo}</h2> */}
                </>
                </>
                :
                <div className="addStuff">

                    <input
                    defaultValue={this.props.postTitle}
                    onChange={e => this.setState({inputFieldText: e.target.value})}
                    />
                    <textarea
                    onChange={(e) => this.setState({ textArea: e.target.value})}
                    defaultValue={this.props.postInfo}
                    ></textarea>

                </div>
                }
                {
                    this.props.canEdit === true?
                <>
                    <div className="all-buttons">
                    {this.state.inEditStatus === false ?
                    <button
                    className="content-button"
                    onClick={() => this.setState({inEditStatus:true})}>
                        EDIT
                    </button>
                    :
                    <button
                    className="content-button"
                    onClick={this.handleClick}>
                        SAVE
                    </button>
                    }
                    <button
                    className="content-button"
                    onClick={this.handleDelete}>
                        DELETE
                    </button>
                    </div>
                </>
                :
                <>
                
                {/* <button>SUBMIT</button> */}
                </>
                }
            </div>
            </>
            </div>
        )
    }
}

export default Post;