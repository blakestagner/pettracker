import React from 'react';
import profileImg from '../img/icons/profile.svg'
import './user.scss';
import ImageUpload from '../img/ImageUpload';
import addPhotoWhiteIcon from '../img/icons/add_photo_white.svg';
import addPhotoBlackIcon from '../img/icons/add_photo_black.svg';
import { useHistory } from "react-router-dom";

const Avatar = ({
                type,
                petDetails, 
                userDetails, 
                profileImgUrl,
                petProfileImgUrl, 
                handleToggle}) => {
       //const userImgServer = 'http://images.blakestagner.com/users/profileImg/';
        //const petsImgServer = 'http://images.blakestagner.com/pets/profileImg/';

        //const avatarHumanImg = window.location.origin + `/img/profileImg/${String(profileImgUrl)}.jpg`
        //const avatarPetImg = window.location.origin + `/img/petImg/${String(petProfileImgUrl)}.jpg`        
        
        
        const userImgServer = window.location.origin + `/img/profileImg/`;
        const petsImgServer = window.location.origin + `/img/petImg/`;
        
        const avatarHumanImg = 
            `${userImgServer}${String(profileImgUrl)}.jpg`
        const avatarPetImg =  
            `${petsImgServer}${String(petProfileImgUrl)}.jpg`
        
        const displayImage = () => {
            if(type === 'pet') {
                if(userDetails.pet_id === 0) {
                    return <DefaultAvatar />
                } else if(petDetails.profile_pic === 0){
                    return <DefaultAvatar />
                } else {
                    return <PetAvatar profileImg={avatarPetImg}/>
                }
            } else if(type === 'human') {
                if(userDetails.profile_pic) {
                    return <HumanAvatar 
                                userDetails={userDetails}
                                profileImg={
                                    avatarHumanImg}/>
                } else {
                    return <DefaultAvatar />
                }
            } else if(type === 'human-large') {
                if(userDetails.profile_pic) {
                    return <HumanAvatarLarge 
                                profileImg={
                                    avatarHumanImg}/>
                } else {
                    return <DefaultAvatarLarge 
                                userDetails={userDetails}/>
                }
            } else if (type === 'pet-large') {
                if(userDetails.pet_id === 0) {
                    return <DefaultAvatarPetLarge />
                } else if(petDetails.profile_pic === 0) {
                    return <DefaultAvatarPetLarge 
                                />
                } else {
                    return <PetAvatarLarge profileImg={avatarPetImg}/>
                }
            } else if (type === 'pet-select') {
                if(userDetails.pet_id === 0) {
                    return <DefaultAvatarPetLarge />
                } else if(petDetails.profile_pic === 0) {
                    return <DefaultAvatarPetSelectLarge />
                } else {
                    return <PetAvatarSelectLarge profileImg={avatarPetImg}/>
                }
            } else {
                return ''
            }
        }


        return (
            <div>
                <a href="#toggle" onClick={handleToggle}>
                    { displayImage() }
                </a>
            </div>
        )
}
export default Avatar

export function DefaultAvatar() {

    return (
        <div>
             <img 
                className='default-profile-img'
                src={profileImg} 
                alt='default profile pic'/>
        </div>
    )
}
export function DefaultAvatarLarge(props) {

    return (
        <div className="profile-avatar">
             <img 
                className='default-profile-img-large'
                src={profileImg} 
                alt='default profile pic'/>
            <ImageUploadIcon 
                type='human'
                userDetails={props.userDetails}/>
        </div>
    )
}
export function DefaultAvatarPetLarge(props) {

    return (
        <div className="profile-avatar">
             <img 
                className='default-profile-img-large'
                src={profileImg} 
                alt='default profile pic'/>
            <ImageUploadIcon 
                type='pet'
                userDetails={props.userDetails}/>
        </div>
    )
}
export function HumanAvatar(props) {

    return (
        <div>
            <img 
                className='profile-img'
                src={props.profileImg} 
                alt={props.avatarHumanImg}/>
        </div>
    )
}

export function HumanAvatarLarge(props) {

    return (
        <div className="profile-avatar">
            <img 
                className='profile-img-large'
                src={props.profileImg} 
                alt={props.avatarHumanImg}/>
            <ImageUploadIcon 
                type='human'
                userDetails={props.userDetails}/>
        </div>
    )
}
export function PetAvatar(props) {

    return (
        <div>
            <img 
                className='profile-img'
                src={props.profileImg} 
                alt='default profile pic'/>
        </div>
    )
}
export function PetAvatarLarge(props) {

    return (
        <div className="profile-avatar">
            <img 
                className='profile-img-large'
                src={props.profileImg} 
                alt='default profile pic'/>
            <ImageUploadIcon 
                type='pet'
                userDetails={props.userDetails}/>
        </div>
    )
}
export function PetAvatarSelectLarge(props) {

    return (
        <div className="profile-avatar">
            <img 
                className='profile-img-large'
                src={props.profileImg} 
                alt='default profile pic'/>
        </div>
    )
}
export function DefaultAvatarPetSelectLarge(props) {

    return (
        <div className="profile-avatar">
             <img 
                className='default-profile-img-large'
                src={profileImg} 
                alt='default profile pic'/>
        </div>
    )
}
export function DefaultSelectAvatar() {

    return (
        <div>
             <img 
                className='default-profile-img'
                src={profileImg} 
                alt='default profile pic'/>
        </div>
    )
}

function ImageUploadIcon(props) {




    const history = useHistory();

    const handleClick = () => {
        history.push("/image-upload", {type: props.type, prevLocation: 'diff'});

    }


    const imageUpload = {
        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        border: 'solid #fff 2px',
        backgroundColor: '#202020',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0',
        position: 'absolute',
        bottom: '0',
        left: '50%'
    }
    const imageUploadIcon = {
        width: '25px',
        height: '25px',
    }

    return (
        <div
            onClick={() => handleClick()} 
            style={imageUpload}>
            <img
                style={imageUploadIcon}
                src={addPhotoWhiteIcon}/>
        </div>
    )
}
