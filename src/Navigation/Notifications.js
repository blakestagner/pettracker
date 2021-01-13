import SearchBlack from '../img/icons/search_black.svg';
import {useEffect, useState} from 'react'
import CloseWhiteIcon from '../img/icons/close_white.svg';
import NotificationIcon from '../img/icons/notifications-grey.svg';
import { getPendingRequest, getOtherUsers } from '../Autho/Repository';


function Notifications(props) {
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
                <NotificationsExpanded
                    expanded={expanded} 
                    userDetails={props.userDetails}
                    toggle={() => Toggle()}/>
        </div>
    )
}



export default Notifications;


function NotificationsExpanded(props) {
    const [pendingRequests, setPendingReuests] = useState()


    const PendingRequests = () => {
        getPendingRequest()
        .then(res => {
            setPendingReuests(res)
            console.log(res)
        })
        .catch(err => console.log(err))
        .finally(() => {
            console.log(pendingRequests)
            
        })
    }



    useEffect(() => {
        PendingRequests()
    }, [props.toggle])

    return (
        <div className={props.expanded === 0?  'menu-colapsed' : 'menu-expanded'}>
            <div className="search-bar">
                <h2>Notifications</h2>
               
                <div 
                    className="close-search"
                    onClick={props.toggle}>
                    <img 
                        alt="close search"
                        src={CloseWhiteIcon} />
                </div>
            </div>
            <div>
                {props.userDetails.fname}
                <h2>Pending Requests</h2>
                
            </div>
        </div>
    )
}