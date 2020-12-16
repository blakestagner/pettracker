import React from 'react';
import profileImg from '../img/icons/profile.svg'
import './user.scss';

const Avatar = ({userDetails, profileImgUrl, hasProfileImg}) => {
        const avatarImg = window.location.origin + `/img/profileImg/${String(profileImgUrl)}.jpg`
          
        return (
            <div>
                <img 
                    className={hasProfileImg ? 'profile-img' : 'default-profile-img'}
                    src={hasProfileImg ? avatarImg : profileImg} 
                    alt={avatarImg}/>
            </div>
        )
}
export default Avatar