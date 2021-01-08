import { Link } from 'react-router-dom';
import './navigation.scss';
import arrow from '../img/icons/arrow_back.svg'
import React, { useState, useImperativeHandle, forwardRef, useEffect} from "react";
import Logout from '../Autho/login_register/Logout';
import Avatar from '../User/Avatar';
import { getPetInfo, getAllPetInfo } from '../Autho/Repository';


const SlideOutNavRight = forwardRef((props, ref) => {

    const [sideNav, toggleSideNav] = useState(0);
    const [otherPets, setOtherPets] = useState(0);

    const root = document.querySelector('#root');

    
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

    const displayOtherPets = () => {
        let petsArray = [];        
        let pets = props.petList;

        props.petList.filter(obj => obj.pet_id !== props.petDetails.id).map(obj => {
            petsArray.push(obj.pet_id)
        })
        const avatarDetails = () => {
            getAllPetInfo(petsArray)
            .then(res => {
                setOtherPets(res);
            })
            .catch((err) => {
                console.log(err)
            })
        }
        if(petsArray.length + 1 === pets.length) {
            avatarDetails()
        }
    }



    useEffect(() => {
        displayOtherPets()

    }, [props.petDetails])
    
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
                <div id="other-pet-avatar">
                
                {otherPets === 0 ? ''
                    : 
                    otherPets.map(obj => (
                    <div key={obj.id}>
                        <Avatar 
                            petDetails={obj}
                            userDetails={props.userDetails}
                            petProfileImgUrl = { 
                                obj.id+
                                obj.name}
                            type="pet"
                        />
                    </div>
                    ))
                    
                }

                </div>
                
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