import {useEffect, useState} from 'react'
import CloseWhiteIcon from '../img/icons/close_white.svg';
import NotificationIcon from '../img/icons/notifications-grey.svg';
import './user.scss'
import PostsIcon from '../img/icons/posts.svg';


function UserPosts(props) {





    return (
        <div className="user-posts">
            <h2>Posts</h2>
            <p>Coming Soon</p>
            {props.userDetails.fname}
        </div>
    )
}
export default UserPosts;

