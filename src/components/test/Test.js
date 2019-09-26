import React, { Component } from 'react';
import axios from 'axios';

class Test extends Component{

    state = {
        selectedFile:null
    }

    fileSelectedHandler = e => {
        // console.log(e.target.files[0]);
        this.setState({
            selectedFile: e.target.files[0]
        })
    }

    fileUploadHandler = () => {
        axios.post('');
    }
    render() {
        return (
            <div>
                <input type='file' onChange={this.fileSelectedHandler}/>
                <button onClick={this.state.fileUploadHandler}>Upload</button>
            </div>
        )
    }
}

export default Test;