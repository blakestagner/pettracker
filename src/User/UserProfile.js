import Avatar from './Avatar';
import { useEffect, useState, useRef } from 'react';
import Loading from '../HelperComponents/Loading';
import FileUpload from '../img/FileUpload';
import ProfileMenu from './ProfileMenu';
import FriendsIcon from '../img/icons/friends.svg';
import PetsIcon from '../img/icons/pets.svg';
import { getAllFriends } from '../Autho/Repository';

function UserProfile(props) {
    const [isLoading, doneLoading] = useState(true);
    const [newUpload, setUpload] = useState(0);
    const [friends, setFriends] = useState(null)
    const toggleImageUploadRef = useRef();



    useEffect(() => {
        doneLoading(false)
    }, [])

    const uploadNewImg = () => {
        setUpload(1)
        toggleImageUploadRef.current.toggleImageUpload()
    }

    useEffect(() => {
        const friendsList = () => {
            getAllFriends()
            .then(res => {
                setFriends(res)
            })
            .catch(err => console.log(err))
        }
        if(isLoading === false) {
            friendsList()
        } else;
    }, [isLoading])


    const updateUserImage = () => {
        props.updateUserImage()
    }
    const updateUserData = () => {
        props.updateUserData()
    }


    if(isLoading === true) {
        return <Loading />
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
                    <div className="row-of-rows">
                        <img
                            className="img-icon" 
                            src={PetsIcon} 
                            alt="pet count"/>
                        <p>{props.petList.length} Pet
                            {props.petList.length > 1 || 
                            props.petList.length === 0 ? 's': '' }</p>
                    </div>
                    <div className="row-of-rows">
                        <img
                            className="img-icon" 
                            src={FriendsIcon}
                            alt="friends"/>
                        <p>{friends !== null ? friends.length : 0} friends</p>               
                    </div>
                </div>
            </div>
            <ProfileMenu
                updateUserData={() => updateUserData()} 
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