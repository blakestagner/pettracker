import Avatar from './Avatar';
import { useEffect, useState, useRef } from 'react';
import Loading from '../HelperComponents/Loading';
import FileUpload from '../img/FileUpload';
import ProfileMenu from './ProfileMenu';


function UserProfile(props) {
    const [isLoading, doneLoading] = useState(true);
    const [newUpload, setUpload] = useState(0);
    const toggleImageUploadRef = useRef();



    useEffect(() => {
        doneLoading(false)
    }, [])

    const uploadNewImg = () => {
        setUpload(1)
        toggleImageUploadRef.current.toggleImageUpload()
    }

    if(isLoading === true) {
        return <Loading />
    }

    const updateUserImage = () => {
        props.updateUserImage()
    }

    return (
        <div className="profile-main">
            <p className="header-text">{props.userDetails.fname}'s<span> Profile</span></p>
            <div className="icon-text-row">
                <div style={{margin: '0 auto'}}>
                    <Avatar
                        yolo={'hi'}
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
            <ProfileMenu 
                userDetails={props.userDetails}
                petDetails={props.petDetails}
                currentPet={props.currentPet}
                petList={props.petList}/>

            <FileUpload
                updateUserImage={() => updateUserImage()}
                ref={toggleImageUploadRef}
                show={newUpload}
                type="human"/>
            
        </div>
    )
}
export default UserProfile;