import SearchBlack from '../img/icons/search_black.svg';
import {useState} from 'react'
import CloseWhiteIcon from '../img/icons/close_white.svg';
import NotificationIcon from '../img/icons/notifications-grey.svg';

function Notifications() {
    const [expanded, setExpanded] = useState(0)

    const Toggle = () => {
        if(expanded === 0) {
            setExpanded(1)
        } else setExpanded(0)
    }

    

    return (
        <div className="menu-icon">
                <img
                    onClick={() => Toggle()}
                    alt='search'
                    src={NotificationIcon} />
            {expanded === 0 ? '' :
                <NotificationsExpanded 
                    toggle={() => Toggle()}/>
            }
        </div>
    )
}



export default Notifications;


function NotificationsExpanded(props) {



    return (
        <div className="menu-expanded">
            <div className="search-bar">
                <p>Notifications</p>
               
                <div 
                    className="close-search"
                    onClick={props.toggle}>
                    <img 
                        alt="close search"
                        src={CloseWhiteIcon} />
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}