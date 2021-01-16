import './user.scss'
import PetsIcon from '../img/icons/pets.svg';
import PostsIcon from '../img/icons/posts.svg';
import FriendsIcon from '../img/icons/friends.svg';

import {useState, useEffect } from 'react';

import Friends from './Friends';
import UserPets from './UserPets';
import UserPosts from './UserPosts';


function ProfileMenu(props) {
    const [expanded, setExpanded] = useState('Posts')

    
    useEffect(()=> {

        const highLightSection = () => {
            const highlight = document.querySelector('#highlight-selection')
            const menu = document.querySelector('#profile-information')
    
            const firstChild = menu.childNodes[0];
            const secondChild = menu.childNodes[1];
            const thirdChild = menu.childNodes[2];
            
    
            highlight.style.width = `${firstChild.getBoundingClientRect().width}px`
    
            switch(expanded) {
                case 'Posts':
                    highlight.style.left = `${firstChild.getBoundingClientRect().left}px`;
                    break;
                case 'Pets':
                    highlight.style.left = `${secondChild.getBoundingClientRect().left}px`;
                    break;
                case 'Friends':
                    highlight.style.left = `${thirdChild.getBoundingClientRect().left}px`;
                    break;
                default:
            }
        }
        highLightSection()

    }, [expanded])

    return (
            <div>
                <div
                    id="profile-information">
                    <div
                        onClick={() => setExpanded('Posts')} 
                        className="profile-information-icon">
                        <img
                            alt='Posts'
                            src={PostsIcon} />
                            <p>Posts</p>
                    </div>
                    <div
                        onClick={() => setExpanded('Pets')}  
                        className="profile-information-icon">
                        <img
                            alt='pets'
                            src={PetsIcon} />
                            <p>Pets</p>
                    </div>
                    <div
                        onClick={() => setExpanded('Friends')}  
                        className="profile-information-icon">
                        <img
                            alt='search'
                            src={FriendsIcon} />
                        
                            <p>Friends</p>
                    </div>
                </div>
                <div id="highlight-selection-container">
                    <div id="highlight-selection"></div>
                </div>
                {expanded === 'Friends' ? 
                    <Friends 
                        userDetails={props.userDetails}
                        expanded={expanded === 'Friends' ? 
                            true : false}/> : ''
                }
                {expanded === 'Posts' ? 
                    <UserPosts  
                        userDetails={props.userDetails}
                        expanded={expanded === 'Posts' ? 
                            true : false}/> : ''
                }
                {expanded === 'Pets' ? 
                    <UserPets
                        userDetails={props.userDetails}
                        petDetails={props.petDetails}
                        currentPet={props.currentPet}
                        petList={props.petList}
                        expanded={expanded === 'Pets' ? 
                            true : false}/> : ''
                }
            </div>
        )
}
export default ProfileMenu;