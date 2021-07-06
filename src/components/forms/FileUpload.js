import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'


const FileUpload = () => {

    const fileUploadAndResize = (e) => {
        console.log(e.target.files)

        let files = e.target.files;
        if(files){
            for(let i = 0; i < files.length; i++){
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    console.log(uri)
                }, "base64"); 
                
            }
        }
    }
    return (
        <div className="row">
            <label className="btn btn-primary">Choose Files
                <input type="file" multiple accept="images/*" hidden onChange={fileUploadAndResize} />
            </label>
        </div>
    )
}

export default FileUpload
