import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from 'antd'


const FileUpload = ({values, setValues, setLoading}) => {

    const {user} = useSelector(state => state)

    const fileUploadAndResize = (e) => {
        console.log(e.target.files)

        let files = e.target.files;
        let allUploadedFiles = values.images;

        if(files){
            setLoading(true)
            for(let i = 0; i < files.length; i++){
                Resizer.imageFileResizer(files[i], 720, 720, 'JPEG', 100, 0, (uri) => {
                    console.log(uri)
                    axios.post(`${process.env.REACT_APP_API}/uploadimages`, {image: uri}, {
                        headers: {
                            authtoken: user ? user.token : ''
                        }
                    })
                    .then( res => {
                        console.log(res)
                        setLoading(false)
                        allUploadedFiles.push(res.data)

                        setValues({...values, images: allUploadedFiles })
                    })
                    .catch(err => {
                        setLoading(false)
                        console.log('Cloudinary upload error')
                    })
                }, "base64"); 
                
            }
        }
    }
    const handleImageRemove = (public_id) => {
        setLoading(true)
        console.log(public_id)

        axios.post(`${process.env.REACT_APP_API}/removeimage`, public_id, {
            headers: {
                authtoken: user ? user.token : ''
            }
        })
        .then( res => {
            console.log(res)
            setLoading(false)
            const { images } = values
            let filteredImages = images.filter((item) => {
                return item.public_id !== public_id
            })

            setValues({...values, images: filteredImages})
           
        })
        .catch(err => {
            setLoading(false)
            console.log('Cloudinary image remove error', err)
        })
    }
    return (
        <>
        <div className="row">
            {values.images && values.images.map( image => (
                <Badge
                style={{cursor: 'pointer'}}
                count="X" key={image.public_id} onClick={() => handleImageRemove(image.public_id)}>
                    <Avatar src={image.url} size={100} shape="square" className="ml-3 mb-3"/>
                </Badge>
            ))}
        </div>
        
         <div className="row">
            <label className="btn btn-primary">Choose Files
                <input type="file" multiple accept="images/*" hidden onChange={fileUploadAndResize} />
            </label>
        </div>
        </>
       
    )
}

export default FileUpload
