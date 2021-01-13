import React from 'react';
import profileImg from '../img/icons/profile.svg'
import './user.scss';
import addPhotoWhiteIcon from '../img/icons/add_photo_white.svg';
import addIcon from '../img/icons/add.svg';

const Avatar = ({
                uploadImg,
                type,
                petDetails, 
                userDetails, 
                profileImgUrl,
                petProfileImgUrl, 
                handleToggle}) => {
        
        const avatarHumanImg = profileImgUrl;
        const avatarPetImg =  petProfileImgUrl;
        

        const uploadImage = () => {
            uploadImg()
        }



        const displayImage = (props) => {
            if(type === 'pet') {
                if(userDetails.pet_id === 0) {
                    return <AddPetAvatar />
                } else if(petDetails.profile_pic === '0'){
                    return <DefaultAvatar />
                } else {
                    return <PetAvatar profileImg={avatarPetImg}/>
                }




            } else if(type === 'human') {
                if(userDetails.profile_pic === '0') {
                    return <DefaultAvatar />
                } else {
                    return <HumanAvatar 
                                userDetails={userDetails}
                                profileImg={avatarHumanImg}/>
                }




            } else if(type === 'human-large') {
                if(userDetails.profile_pic === '0') {
                    return <DefaultAvatarLarge 
                                userDetails={userDetails}/>
                } else {
                    return  <HumanAvatarLarge 
                                profileImg={
                                    avatarHumanImg}/>
                }

            } else if(type === 'human-profile') {
                if(userDetails.profile_pic === '0') {
                    return <DefaultAvatarProfileLarge 
                                uploadImg={uploadImage}
                                userDetails={userDetails}/>
                } else {
                    return  <HumanAvatarProfileLarge
                                uploadImg={uploadImage}
                                profileImg={
                                    avatarHumanImg}/>
                    }

            } else if (type === 'pet-large') {
                if(userDetails.pet_id === 0) {
                    return;
                } else if(petDetails.profile_pic === '0') {
                    return <DefaultAvatarPetLarge 
                                />
                } else {
                    return <PetAvatarLarge profileImg={avatarPetImg}/>
                }



            } else if (type === 'pet-profile') {
                if(userDetails.pet_id === 0) {
                    return;
                } else if(petDetails.profile_pic === '0') {
                    return <DefaultAvatarPetProfileLarge 
                                uploadImg={uploadImage}
                                />
                } else {
                    return <PetAvatarProfileLarge 
                                uploadImg={uploadImage}
                                profileImg={avatarPetImg}/>
                }
                



            } else if (type === 'pet-select') {
                if(petDetails.profile_pic === '0') {
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


export function AddPetAvatar() {

    return (
        <div>
             <img 
                className='add-pet-avatar'
                src={addIcon} 
                alt='default profile pic'/>
        </div>
    )
}

export function DefaultAvatar() {

    return (
        <div className="profile-avatar">
             <img 
                className='default-profile-img'
                src={profileImg} 
                alt='default profile pic'/>
        </div>
    )
}
export function DefaultAvatarAdd() {

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
export function DefaultAvatarProfileLarge(props) {

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
export function HumanAvatarProfileLarge(props) {


    return (
        <div className="profile-avatar">
             <img 
                className='default-profile-img-large'
                src={props.profileImg} 
                alt='default profile pic'/>
            <ImageUploadIcon 
                uploadImg={props.uploadImg}
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
export function DefaultAvatarPetAddLarge(props) {

    return (
        <div className="profile-avatar">
             <img 
                className='default-profile-img-large'
                src={profileImg} 
                alt='default profile pic'/>

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
        </div>
    )
}

export function DefaultAvatarPetProfileLarge(props) {

    return (
        <div className="profile-avatar">
            <img 
                className='profile-img-large'
                src={profileImg} 
                alt='default profile pic'/>
            <ImageUploadIcon 
                uploadImg={props.uploadImg}
                type='pet'
                userDetails={props.userDetails}/>
        </div>
    )
}
export function PetAvatarProfileLarge(props) {

    return (
        <div className="profile-avatar">
            <img 
                className='profile-img-large'
                src={props.profileImg} 
                alt='default profile pic'/>
            <ImageUploadIcon 
                uploadImg={props.uploadImg}
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

function ImageUploadIcon(props) {

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
            onClick={props.uploadImg} 
            style={imageUpload}>
            <img
                alt=""
                style={imageUploadIcon}
                src={addPhotoWhiteIcon}/>
        </div>
    )
}
