import { Link } from 'react-router-dom';
import './navigation.scss';
import arrow from '../img/icons/arrow_back.svg'
import React, { useState, useImperativeHandle, forwardRef} from "react";
import Logout from '../Autho/login_register/Logout';
import Avatar from '../User/Avatar';


const SlideOutNavRight = forwardRef((props, ref) => {

    const [sideNav, toggleSideNav] = useState(0);
    const root = document.querySelector('#root')
    
    const toggleNav = () => {
        if (sideNav === 0 ) {
            toggleSideNav(1)
            handleInputBeyond();
        } else if (sideNav === 1) {
            toggleSideNav(0)
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
        <div id="side-nav-right" className={sideNav ? 'side-nav-open' : 'side-nav-closed'}>
            <img 
                src={arrow}
                className="back-arrow" 
                alt="close menu"
                />
                <Avatar 
                    petDetails={props.petDetails}
                    userDetails={props.userDetails}
                    petProfileImgUrl = { 
                        props.petDetails.id+
                        props.petDetails.name}
                    type="pet-large"
                    />
                <ul className="mobile-navbar-list" id="mobileNavBarList" >
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/register-pet">Add a Pet</Link>
                    </li>
                </ul>
                <Logout logout={() => props.logout()}/>
            </div>
    )
})
export default SlideOutNavRight;