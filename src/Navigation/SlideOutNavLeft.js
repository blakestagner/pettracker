import { Link } from 'react-router-dom';
import './navigation.scss';
import arrow from '../img/icons/arrow_back.svg'
import React, { useState, useImperativeHandle, forwardRef} from "react";
import Logout from '../Autho/login_register/Logout';
import Avatar from '../User/Avatar';

const SlideOutNavLeft = forwardRef((props, ref) => {

    const [sideNav, toggleSideNav] = useState(0);
    const root = document.querySelector('#root')
    
    const toggleNav = () => {
        if (sideNav === 0 ) {
            toggleSideNav(1)
            handleInputBeyond();
        } else if (sideNav === 1) {
            
        } else console.log('error')
        
    }

    const handleInputBeyondEventListener = () => {
        toggleSideNav(0)
        root.removeEventListener('click', handleInputBeyondEventListener)
    }

    const handleInputBeyond = () => {
        root.addEventListener('click', handleInputBeyondEventListener)
    }
    
    useImperativeHandle(ref, () => ({
        toggle() {
          toggleNav()
        }
      }));

    return (
        <div id="side-nav-left" className={sideNav ? 'side-nav-left-open' : 'side-nav-left-closed'}>
            <img 
                src={arrow}
                className="back-arrow" 
                alt="close menu"
                />
                <Avatar 
                    userDetails={props.userDetails}
                    profileImgUrl = {props.userDetails.profile_pic}
                    hasProfileImg={props.userDetails.profile_pic}
                    type="human-large"/>
                <ul className="mobile-navbar-list" id="mobileNavBarList" >
                    <li>
                        <Link to="/user-profile">profile</Link>
                    </li>
                </ul>
                <Logout logout={() => props.logout()}/>
            </div>
    )
})
export default SlideOutNavLeft;