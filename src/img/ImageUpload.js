import addPhotoWhiteIcon from '../img/icons/add_photo_white.svg';
import addPhotoBlackIcon from '../img/icons/add_photo_black.svg';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";

import { uploadUserImage } from '../Autho/Repository'

function ImageUpload(props) {
    const [uploadClicked, setClicked] = useState(1);
    const [loading, doneLoading ] = useState(1);
    const [recievedType, setType] = useState(0);

    const [newImage, setImage] = useState(0);
    const [progress, setProgress] = useState(0);


    const location = useLocation();
    const history = useHistory

    useEffect(() => {
        if(typeof(location.state) === 'undefined') {
            setType(0)
            doneLoading(0)
        } else {

            console.log(location.state.type)
            setType(location.state.type)

            doneLoading(0)
        }

    }, [recievedType])

    useEffect(() => {
        
        if(typeof(location.state) === 'undefined') {
            return;
        } else {
            setType(location.state.type)
        }

    }, [location.state])
    
    if(loading) {
        return (
            <div>
                <p>loading</p>
            </div>
        )
    }

    const checkMimeType = (event) => {
        //getting file object
        let files = event.target.files 
        //define message container
        let err = ''
        // list allow mime type
       const types = ['image/png', 'image/jpeg', 'image/gif']
        // loop access array
        for(var x = 0; x<files.length; x++) {
         // compare file type find doesn't matach
             if (types.every(type => files[x].type !== type)) {
             // create error message and assign to container   
             err += files[x].type+' is not a supported format\n';
           }
         };
      
       if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            console.log(err)
             return false; 
        }
       return true;
      
    }

    const checkFileSize = (event) => {
        let files = event.target.files
        let size = 15000 
        let err = ""; 
        for(var x = 0; x<files.length; x++) {
        if (files[x].size > size) {
         err += files[x].type+'is too large, please pick a smaller file\n';
       }
     };
     if (err !== '') {
        event.target.value = null
        console.log(err)
        return false
   }
   
   return true;
   
   }

    const onChangeHandler = (evt) => {
        console.log(evt.target.files[0])
        setImage(evt.target.files[0])
    }
    const onClickHandler = () => {
 
            //setImage(prevState => ({
            //    ...prevState,
            //    name: 'hi.jpg'
            //}))
        const data = new FormData() 
        data.append('file', newImage)
        
        uploadUserImage(data)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    //    axios.post("http://localhost:8000/upload", data, {  
    //    })
    //    .then(res => console.log(res.statusText))
    //    .catch(err => console.log(err.statusText))
    }
    return (
        <div>
            <h1>Upload a new img</h1>
            {recievedType === 0 ? 
                <div>
                    <p>Just a refresh</p>
                </div> 
            :
                <div>
                    <p>{recievedType}</p>
                    <input type="file" name="file" onChange={onChangeHandler}/>
                    <button 
                        type="button" 
                        onClick={onClickHandler}>Upload</button> 
                </div>    
            }
        </div>
    )
}
export default ImageUpload;