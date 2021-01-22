import '../User/user.scss'
import PetsIcon from '../img/icons/pets.svg';
import SettingsIcon from '../img/icons/settings.svg';
import OwnerIcon from '../img/icons/friends.svg';
import PetOwner from './PetOwner';
import PetActivity from './PetActivity';
import PetSettings from './PetSettings';
import {useState, useEffect } from 'react';



function PetProfileMenu(props) {
    const [expanded, setExpanded] = useState('Activity')

    
    useEffect(()=> {
        const highlight = document.querySelector('#highlight-selection')
        const menu = document.querySelector('#profile-information')
        const firstChild = menu.childNodes[0];
        const secondChild = menu.childNodes[1];
        const thirdChild = menu.childNodes[2];
        highlight.style.width = `${firstChild.getBoundingClientRect().width}px`
        switch(expanded) {
            case 'Activity':
                highlight.style.left = `${firstChild.getBoundingClientRect().left}px`;
                break;
            case 'Owner':
                highlight.style.left = `${secondChild.getBoundingClientRect().left}px`;
                break;
            case 'Setting':
                highlight.style.left = `${thirdChild.getBoundingClientRect().left}px`;
                break;
            default:
        }
    }, [expanded])

    return (
            <div>
                <div
                    id="profile-information">
                    <div
                        onClick={() => setExpanded('Activity')}  
                        className="profile-information-icon">
                        <img
                            alt='Activity'
                            src={PetsIcon} />
                            <p>Activity</p>
                    </div>
                    <div
                        onClick={() => setExpanded('Owner')} 
                        className="profile-information-icon">
                        <img
                            alt='Owner'
                            src={OwnerIcon} />
                            <p>Owner</p>
                    </div>
                    <div
                        onClick={() => setExpanded('Setting')}  
                        className="profile-information-icon">
                        <img
                            alt='Setting'
                            src={SettingsIcon} />
                        
                            <p>Settings</p>
                    </div>
                </div>
                <div id="highlight-selection-container">
                    <div id="highlight-selection"></div>
                </div>
                {expanded === 'Activity' ? 
                    <PetActivity petDetails={props.petDetails}/> : ''
                }
                {expanded === 'Owner' ? 
                    <PetOwner /> : ''
                }
                {expanded === 'Setting' ? 
                    <PetSettings
                        open={expanded} 
                        petDetails={props.petDetails} /> : ''
                }
            </div>
        )
}
export default PetProfileMenu;