import React from "react";
import axios from 'axios';
import NavBar from "../navBar/NavBar";

class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditStatus: false,
            inputFieldText: "",
            textArea: ""
        }
    }
    handleClick = e => {
        this.setState({inEditStatus:false});
        axios.put(`/api/post/${this.props.id}`, {
            title:this.state.inputFieldText,
            info: this.state.textArea
        }).then(response => {
            this.props.updatePastPost(response.data);
        })
    }
    handleDelete = () => {
        axios.delete(`/api/post/${this.props.id}`).then(response => {
            this.props.updatePastPost(response.data);
        })
    }

    render() {
        return (
            <>
            <NavBar/>
            
            <div
            style={{
                "border" : "1px solid black",
                "width": "30vw"
            }}>
                {
                    this.state.inEditStatus === false ?
                <>
                    <h2>{this.props.postTitle}</h2>
                    <h2>{this.props.postInfo}</h2>
                </>
                :
                <>
                    <input
                    defaultValue={this.props.postTitle}
                    onChange={e => this.setState({inputFieldText: e.target.value})}
                    />
                    <textarea
                    onChange={(e) => this.setState({ textArea: e.target.value})}
                    defaultValue={this.props.postInfo}
                    ></textarea>
                </>
                }
                {
                    this.props.UserLanding === true?
                <>
                    {this.state.inEditStatus === false ?
                    
                    <button
                    onClick={() => this.setState({inEditStatus:true})}>
                        EDIT
                    </button>
                    :
                    <button
                    onClick={this.handleClick}>
                        SAVE
                    </button>
                    }
                    <button
                    onClick={this.handleDelete}>
                        DELETE
                    </button>
                </>
                :
                <button>SUBMIT</button>
                }
            </div>
            </>
        )
    }
}

export default Post;