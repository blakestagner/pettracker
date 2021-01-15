import Avatar from './Avatar';
import { useEffect, useState, useRef } from 'react';
import Loading from '../HelperComponents/Loading';
import FileUpload from '../img/FileUpload';

import {getFriendsList } from '../Autho/Repository'

function UserProfile(props) {
    const [isLoading, doneLoading] = useState(true);
    const [newUpload, setUpload] = useState(0);
    const [friends, setFriends] = useState([])
    const toggleImageUploadRef = useRef();



    useEffect(() => {
        doneLoading(false)
        FriendsList()
    }, [])

    const uploadNewImg = () => {
        setUpload(1)
        toggleImageUploadRef.current.toggleImageUpload()
    }

    const FriendsList = () => {
        getFriendsList()
        .then(res => {
            setFriends(res)
        })
        .catch(err => console.log(err))
    }

    if(isLoading === true) {
        return <Loading />
    }

    const updateUserImage = () => {
        props.updateUserImage()
    }

    return (
        <div>
            <p className="header-text">{props.userDetails.fname}'s<span> Profile</span></p>
            <div className="icon-text-row">
                <div style={{margin: '0 auto'}}>
                    <Avatar
                        petDetails={props.petDetails}
                        userDetails={props.userDetails}
                        profileImgUrl = {props.userDetails.profile_pic}
                        hasProfileImg={props.userDetails.profile_pic}
                        type="human-profile"
                        uploadImg={uploadNewImg}
                        
                        />
                </div>
                <div style={{margin: '0 auto'}}>
                    
                </div>
            </div>
            <div>
                <h3>Friends</h3>
                {friends.length > 0 ? 
                    "more than zero" :
                    'less then 0'   
                }
            </div>

                <FileUpload
                    updateUserImage={() => updateUserImage()}
                    ref={toggleImageUploadRef}
                    show={newUpload}
                    type="human"/>
            
        </div>
    )
}
export default UserProfile;