import './navigation.scss';
import Avatar from '../User/Avatar';
import { Link } from 'react-router-dom';
import SlideOutNavRight from './SlideOutNavRight';
import SlideOutNavLeft from './SlideOutNavLeft';
import React, { useEffect, useRef } from "react";
import Search from './Search'
import Notifications from './Notifications'
import {
    BrowserView,
    MobileView,
    //isBrowser
    //isMobile
  } from "react-device-detect";


function TopNav(props) {

    const toggleNavRef = useRef();
    const toggleNavLeftRef = useRef();

    const logout = () => {
        props.logout();
    }

    const changePet = (id) => {
        props.changePet(id)
    }


    if(props.isLoggedIn === false) {
        return ''
    }
    return (
        <div className="top-nav">
            <div className="nav-left">
            <Avatar 
                userDetails={props.userDetails}
                profileImgUrl = {props.userDetails.profile_pic}
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
            <div style={{display: 'flex'}}>
                <Search userDetails={props.userDetails}/>
                <Notifications userDetails={props.userDetails}/>
            </div>
            <div className="nav-right">
                <Avatar 
                    petDetails={props.petDetails}
                    userDetails={props.userDetails}
                    petProfileImgUrl={props.petDetails.profile_pic}
                    type="pet"
                    handleToggle={() => toggleNavRef.current.toggle()}
                    />
            </div>
            <SlideOutNavLeft
                userDetails={props.userDetails}
                profileImgUrl = { 
                    props.userDetails.id+
                    props.userDetails.fname+
                    props.userDetails.lname}
                hasProfileImg={props.userDetails.profile_pic}
                type="human"
                ref={toggleNavLeftRef} 
                logout={() => logout()}/>
            <SlideOutNavRight
                currentPet={props.currentPet}
                petList={props.petList}
                petDetails={props.petDetails}
                userDetails={props.userDetails}
                petProfileImgUrl = {props.petDetails.profile_pic}
                type="pet" 
                changePet={(id) => changePet(id)}
                ref={toggleNavRef} 
                logout={() => logout()}/>
        </div>
    )
}
export default TopNav;