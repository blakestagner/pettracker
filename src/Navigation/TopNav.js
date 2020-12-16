import './navigation.scss';
import Avatar from '../User/Avatar';
import { Link } from 'react-router-dom';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";

function TopNav(props) {

    return (
        <div className="top-nav">
            <div className="nav-left">
            <Avatar 
                userDetails={props.userDetails}
                profileImgUrl = { 
                    props.userDetails.id+
                    props.userDetails.fname+
                    props.userDetails.lname}
                hasProfileImg={props.userDetails.profile_pic}/>
            </div>
            <ul className="nav-center"> 
                <li className="menuList">
                    <Link to="/home">home</Link>
                </li> 
                <li className="menuList">
                    <Link to="/timeline">timeline</Link>
                </li>
                <li className="menuList">
                    <Link to="/settings">settings</Link>
                </li>
            </ul>
            <div className="nav-right">
                <Avatar 
                    userDetails={props.userDetails}
                    profileImgUrl = { 
                        props.userDetails.id+
                        props.userDetails.fname+
                        props.userDetails.lname}
                    hasProfileImg={props.userDetails.profile_pic}/>
            </div>
        </div>
    )
}
export default TopNav;