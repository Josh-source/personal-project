import React from "react";
import axios from 'axios';


class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            inEditStatus: false,
            inputFieldText: "",
            textArea: "",
            gallery: [],
            image_url:""
        }
        // this.uploadWidget = this.uploadWidget.bind(this);
    }
    //cloudinary
    componentDidMount(){
        axios.get("/test").then(response => {
            console.log(response);
        })
    }

    // createUploadWidget() {
    //     const widget = window.cloudinary.createUploadWidget(
    //         {
    //           cloudName: "yourCloudName",
    //           uploadPreset: "YourFolderInCloudinary",
    //           sources: ["local", "url", "dropbox", "facebook", "instagram"]
    //         },
    //         (error, result) => {
    //           this.checkUploadResult(error, result);
    //         }
    //       );
      
    // }
    
    handleClick = e => {
        this.setState({inEditStatus:false});
        axios.put(`/api/post/${this.props.id}`, {
            title:this.state.inputFieldText,
            info: this.state.textArea
        }).then(response => {
            console.log(response);
            this.props.updatePastPost(response.data);
        })
    }
    handleDelete = () => {
        axios.delete(`/api/post/${this.props.id}`).then(response => {
            this.props.updatePastPost(response.data);
        })
    }
    // uploadWidget() {
    //     let image = []
    //     const that = this
    //     window.cloudinary.openUploadWidget({ cloud_name: 'friendz0ne', upload_preset: 'l9unmmjr', tags:['friendZone'] },
    //     function(error, result) {
    //         image.push(result)
    //         console.log(image)
    //         console.log(that.state);
    //     })
    //     this.setState({gallery: image})
    // }
    
    

    render() {
        
        return (
            <>
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
                    {/* <img src={this.props.url} /> */}
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
                    this.props.canEdit === true?
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
                <>
                
                {/* <button>SUBMIT</button> */}
                </>
                }
            </div>
            </>
        )
    }
}

export default Post;