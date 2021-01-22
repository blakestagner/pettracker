import { Link } from 'react-router-dom';
import './navigation.scss';
import arrow from '../img/icons/arrow_back.svg'
import React, { useState, useImperativeHandle, forwardRef, useEffect} from "react";
import Logout from '../Autho/login_register/Logout';
import Avatar from '../User/Avatar';
import { getAllPetInfo } from '../Autho/Repository';
import Loading from '../HelperComponents/Loading';


const SlideOutNavRight = forwardRef((props, ref) => {

    const [sideNav, toggleSideNav] = useState(0);
    const [otherPets, setOtherPets] = useState(0);
    const [isLoading, doneLoading] = useState(true);

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




    useEffect(() => {
        const displayOtherPets = () => {
            let petsArray = [];        
            let pets = props.petList;
            if(pets.length > 1) {
                props.petList.filter(obj => obj.pet_id !== props.petDetails.id).map(obj =>
                    petsArray.push(obj.pet_id))
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
            else if(pets.length === 1){
                return;
            } else {
                return;
            }
        }

        displayOtherPets()
    }, [sideNav, props.petDetails.id, props.petList])

    useEffect(() => {
        doneLoading(false)
    }, [])


    if(isLoading === true) {
        return <Loading />
    }
    
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
                    petProfileImgUrl={props.petDetails.profile_pic}
                    type="pet-large"
                    />
                <div id="other-pet-avatar">
                
                {otherPets === 0 ? ''
                    : 
                    otherPets.map(obj => (
                    <div 
                        onClick={() => {props.changePet(obj.id); console.log(obj.id)}}
                        key={obj.id}>
                        <Avatar 
                            petDetails={obj}
                            userDetails={props.userDetails}
                            petProfileImgUrl={obj.profile_pic}
                            type="pet-side-nav"
                        />
                    </div>
                    ))
                    
                }

                </div>
                
                <ul className="mobile-navbar-list" id="mobileNavBarList" >
                    <li>
                        <Link to="/register-pet">Add a Pet</Link>
                    </li>
                </ul>
                <Logout logout={() => props.logout()}/>
            </div>
    )
})
export default SlideOutNavRight;