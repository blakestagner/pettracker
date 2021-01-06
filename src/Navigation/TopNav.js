import './navigation.scss';
import Avatar from '../User/Avatar';
import { Link } from 'react-router-dom';
import SlideOutNavRight from './SlideOutNavRight';
import SlideOutNavLeft from './SlideOutNavLeft';
import React, { useRef } from "react";
import {
    BrowserView,
    MobileView,
    isBrowser
    //isMobile
  } from "react-device-detect";

function TopNav(props) {

    const toggleNavRef = useRef();
    const toggleNavLeftRef = useRef();

    const logout = () => {
        props.logout();
    }
    if(props.isLoggedIn === false) {
        return ''
    }
    return (
        <div className="top-nav">
            <div className="nav-left">
            <Avatar 
                userDetails={props.userDetails}
                profileImgUrl = { 
                    props.userDetails.id+
                    props.userDetails.fname+
                    props.userDetails.lname}
                hasProfileImg={props.userDetails.profile_pic}
                type="human"
                handleToggle={() => toggleNavLeftRef.current.toggle()}/>
            </div>
            <BrowserView>
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
            </BrowserView>
            <MobileView>
                <div className="mobile-topnav-title">
                    <p>f<span>u</span>rb<span>u</span>d</p>
                </div>
            </MobileView>
            <div className="nav-right">
                <Avatar 
                    petDetails={props.petDetails}
                    userDetails={props.userDetails}
                    petProfileImgUrl = { 
                        props.petDetails.id+
                        props.petDetails.name}
                    type="pet"
                    handleToggle={() => toggleNavRef.current.toggle()}
                    />
            </div>
            <SlideOutNavLeft ref={toggleNavLeftRef} logout={() => logout()}/>
            <SlideOutNavRight
                petDetails={props.petDetails}
                userDetails={props.userDetails}
                petProfileImgUrl = { 
                    props.petDetails.id+
                    props.petDetails.name}
                type="pet" 
                ref={toggleNavRef} 
                logout={() => logout()}/>
        </div>
    )
}
export default TopNav;