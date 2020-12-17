import { Link } from 'react-router-dom';
import './navigation.scss';
import arrow from '../img/icons/arrow_back.svg'
import React, {useEffect, useState, useImperativeHandle, forwardRef} from "react";
import Logout from '../Autho/login_register/Logout';

const SlideOutNavRight = forwardRef((props, ref) => {

    const [sideNav, toggleSideNav] = useState(0);

    const toggleNav = () => {
        const sideNavToggle = document.querySelector('#side-nav-right');
        if (sideNav === 0 ) {
            toggleSideNav(1)
        } else if (sideNav === 1) {
            toggleSideNav(0)
        } else console.log('error')
        
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
                onClick={() => toggleNav() }/>
                <ul className="mobileNavBarList" id="mobileNavBarList" >
                    <li>
                        <Link to="/photos">Photos</Link>
                    </li>
                    <li>
                        <Link to="/login">Log Out</Link>
                    </li>
                </ul>
                <Logout logout={() => props.logout()}/>
            </div>
    )
})
export default SlideOutNavRight;