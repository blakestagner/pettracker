import { Link } from 'react-router-dom';
import './navigation.scss';
import arrow from '../img/icons/arrow_back.svg'
import React, { useState, useImperativeHandle, forwardRef} from "react";
import Logout from '../Autho/login_register/Logout';

const SlideOutNavLeft = forwardRef((props, ref) => {

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
        <div id="side-nav-left" className={sideNav ? 'side-nav-left-open' : 'side-nav-left-closed'}>
            <img 
                src={arrow}
                className="back-arrow" 
                alt="close menu"
                />
                <ul className="mobile-navbar-list" id="mobileNavBarList" >
                    <li>
                        <Link to="/home">home</Link>
                    </li>
                </ul>
                <Logout logout={() => props.logout()}/>
            </div>
    )
})
export default SlideOutNavLeft;