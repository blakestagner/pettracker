import './navigation.scss';
import Avatar from '../User/Avatar';
import { Link } from 'react-router-dom';
import SlideOutNavRight from './SlideOutNavRight';
import React, {useRef, useEffect} from "react";


function TopNav(props) {

    const toggleNavRef = useRef();

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
                type="human"/>
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
                    petDetails={props.petDetails}
                    userDetails={props.userDetails}
                    petProfileImgUrl = { 
                        props.petDetails.id+
                        props.petDetails.name}
                    type="pet"
                    handleToggle={() => toggleNavRef.current.toggle()}
                    />
            </div>
            <SlideOutNavRight ref={toggleNavRef} logout={() => logout()}/>
        </div>
    )
}
export default TopNav;