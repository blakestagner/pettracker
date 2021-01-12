import { useEffect, useState, useImperativeHandle, forwardRef } from 'react';

import './imgUpload.scss';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { uploadUserImage, uploadPetImage} from '../Autho/Repository'


import AvatarIcon from '../img/icons/profile_white.svg';
import CloseIcon from '../img/icons/close.svg';
import ArrowDown from '../img/icons/arrow_down.svg';



  const useStyles = makeStyles((theme) => ({
    button: {
        margin: 0,
      },
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },

  }));


const FileUpload = forwardRef((props, ref) => {
    const [loading, doneLoading ] = useState(1);
    const [recievedType, setType] = useState(0);

    const [show, hide] = useState(0);

    const [userMessage, setMessage] = useState();


    const [preview, setPreview] = useState(0)
    const [newImage, setImage] = useState(0);

    const classes = useStyles();


    useEffect(() => {

            console.log(newImage)
            setType(props.type)
            doneLoading(0)

    }, [props.type, newImage])

    useImperativeHandle(ref, () => ({
        toggleImageUpload() {
            toggle()
        }
      }));


    const toggle = () => {
        if(show === 0) {
            hide(1)
        } else {
            hide(0)
        }
    }
    

    const onChangeHandler = (evt) => {
        console.log(evt.target.files[0])
        setImage(evt.target.files[0])
        setPreview(URL.createObjectURL(evt.target.files[0]))
    }

    const onClickHandler = () => {

        const data = new FormData()
        data.append('file', newImage)
        if(recievedType === 'human') {
            uploadUserImage(data)
            .then(res => { // then print response status
                setMessage('New Image Set')
                setTimeout(() => {
                    setMessage('')
                    setImage(0)
                    setPreview(0)
                    hide(0)}, 2000)
                console.log(res.data.destination, res.data.filename)
                })
            .catch(err => console.log(err))
        } else {
            uploadPetImage(data)
            .then(res => { // then print response status
                setMessage('New Image Set')
                setTimeout(() => {
                    setMessage('')
                    setImage(0)
                    setPreview(0)
                    hide(0)}, 2000)
                console.log(res.data.destination, res.data.filename)
                })
            .catch(err => console.log(err))
        }
    }

    const RemoveImage = () => {
        setImage(0)
        setPreview(0)
        console.log(newImage)
    }

    if(loading) {
        return (
            <div>
                <p>loading</p>
            </div>
        )
    }

    return (
        <div 
            className={show === 0 ? 
                'image-upload-body disabled' : 
                'image-upload-body active'}>

            <div className="image-upload-title">
                <h1>Set a new Profile Picture</h1>
                <div
                    onClick={() => toggle()} 
                    className="close-image-upload">
                    <img alt="close" src={ArrowDown} />
                </div>
            </div>
                <div>
                    <p>{recievedType}</p>
                    <div className="file-input-row">
                        <input
                            className={classes.input}
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            name="file"
                            onChange={onChangeHandler}
                        />
                        <label htmlFor="contained-button-file">
                            <Button 
                                variant="contained" 
                                color="inherit" 
                                component="span">
                            Choose an Image
                            </Button>
                        </label>

                        <div 
                            onClick={() => RemoveImage()}
                            className="preview-image-container">
                            <img 
                                alt="preview img"
                                className="preview-image" 
                                src={preview !== 0 ? preview : AvatarIcon}/>
                            {preview === 0 ? '' :
                                <p className="remove-image">
                                <img
                                    alt="close"
                                    src={CloseIcon} />
                                </p> 
                            }
                        </div>
                    </div>
                   {newImage === 0 ? '' :
                        <div className="file-input-row">
                            <Button
                                variant="contained"
                                color="default"
                                type="file"
                                className={classes.button}
                                onClick={onClickHandler}
                                startIcon={<CloudUploadIcon />}
                                >Upload</Button>
                        </div>
                    }
                    <p style={{color: '#fff'}} id="image-message">{userMessage}</p>
                </div>    
        </div>
    )
})
export default FileUpload;