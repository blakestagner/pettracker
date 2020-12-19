import React from 'react';
import profileImg from '../img/icons/profile.svg'
import './user.scss';

const Avatar = ({
                type,
                petDetails, 
                userDetails, 
                profileImgUrl,
                petProfileImgUrl, 
                handleToggle}) => {
        const avatarHumanImg = window.location.origin + `/img/profileImg/${String(profileImgUrl)}.jpg`
        const avatarPetImg = window.location.origin + `/img/petImg/${String(petProfileImgUrl)}.jpg`
        
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
                                profileImg={
                                    avatarHumanImg}/>
                } else {
                    return <DefaultAvatar />
                }
            } else if (type === 'pet-large') {
                if(userDetails.pet_id === 0) {
                    return <DefaultAvatarLarge />
                } else if(petDetails.profile_pic === 0) {
                    return <DefaultAvatarLarge />
                } else {
                    return <PetAvatarLarge profileImg={avatarPetImg}/>
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
export function DefaultAvatarLarge() {

    return (
        <div>
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
        <div>
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
        <div>
            <img 
                className='profile-img-large'
                src={props.profileImg} 
                alt='default profile pic'/>
        </div>
    )
}