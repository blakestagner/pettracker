import React from 'react';
import profileImg from '../img/icons/profile.svg'
import './user.scss';

const Avatar = ({userDetails, profileImgUrl, hasProfileImg, handleToggle}) => {
        const avatarImg = window.location.origin + `/img/profileImg/${String(profileImgUrl)}.jpg`
          
        return (
            <div>
                <a href="#" onClick={handleToggle}>
                <img 
                    className={hasProfileImg ? 'profile-img' : 'default-profile-img'}
                    src={hasProfileImg ? avatarImg : profileImg} 
                    alt={avatarImg}/>
                </a>
            </div>
        )
}
export default Avatar