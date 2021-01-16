import {useEffect, useState} from 'react'
import CloseWhiteIcon from '../img/icons/close_white.svg';
import NotificationIcon from '../img/icons/notifications-grey.svg';
import './user.scss'
import FriendsIcon from '../img/icons/friends.svg';


function TemplateExpand(props) {
    const [expanded, setExpanded] = useState(0);


    const Toggle = () => {
        if(expanded === 0) {
            setExpanded(1)
        } else setExpanded(0)
    }


    return (
        <div className="friends-container">
            <img
                onClick={() => Toggle()}
                alt='search'
                src={FriendsIcon} />
                <UserPetsExpanded
                    toggle={() => Toggle()} 
                    expanded={expanded}/>
        </div>
    )
}
export default TemplateExpand;


function UserPetsExpanded(props) {
    

    return (
        <div className={props.expanded === 0?  'menu-colapsed' : 'menu-expanded'}>
            <div className="search-bar">
                <h2>Friends</h2>
                <div 
                    className="close-search"
                    onClick={props.toggle}>
                    <img 
                        alt="close search"
                        src={CloseWhiteIcon} />
                </div>
            </div>
        </div>
    )
}