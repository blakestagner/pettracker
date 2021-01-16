import SearchBlack from '../img/icons/search_black.svg';
import {useEffect, useState} from 'react'
import CloseWhiteIcon from '../img/icons/close_white.svg';
import NotificationIcon from '../img/icons/notifications-grey.svg';
import { getFriendRequest, getOtherUsers, acceptFriendRequest, denyFriendRequest } from '../Autho/Repository';
import Avatar from '../User/Avatar';
import FormatTime from '../HelperComponents/FormatTime';
import AcceptButton from '../Inputs/AcceptButton';
import DenyButton from '../Inputs/DenyButton';



function Notifications(props) {
    const [expanded, setExpanded] = useState(0);
    const [friendRequests, setFriendRequest] = useState(0);
    const [otherUsers, setOtherUsers] = useState();

    const Toggle = () => {
        if(expanded === 0) {
            setExpanded(1)
        } else setExpanded(0)
    }

    const newFriendRequests = () => {

        getFriendRequest()
        .then(res => {
            setFriendRequest(res)
            console.log(res)
        })
        .catch(err => console.log(err))
    }


    const getOtherUsersData = () => {
        let userIds = [];
        for (let i = 0; i < friendRequests.length; i++){
           userIds[i] = friendRequests[i]["user_one"];
        }
        getOtherUsers(userIds)
            .then(res => {
                setOtherUsers(res)
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    const updateAll = () => {
        setFriendRequest(0)
        setOtherUsers(0)
        newFriendRequests()
    }

    const resetNotifications = () => {
        setFriendRequest(0);
        setOtherUsers();
    }

    useEffect(() => {

        newFriendRequests()

    }, [expanded])

    useEffect(() => {
        if(friendRequests.length > 0) {
            getOtherUsersData()
        } else {
            return;
        }
        
    }, [friendRequests])

    return (
        <div className="menu-icon">
                <img
                    onClick={() => Toggle()}
                    alt='search'
                    src={NotificationIcon} />
                <NotificationsExpanded
                    updateRequests={() => updateAll()}
                    resetNotifications={() => resetNotifications()}
                    expanded={expanded}
                    friendRequests={friendRequests} 
                    otherUsers={otherUsers}
                    userDetails={props.userDetails}
                    toggle={() => Toggle()}/>
        </div>
    )
}
export default Notifications;


function NotificationsExpanded(props) {
    const [accepted, setAccepted] = useState([])
    const [denied, setDenied] = useState([])


    const timeSent = (id) => {
        let time = props.friendRequests.find(user => user.user_one === id )
        return time.created
    }

    const decisionRow = (id) => {

        if(accepted.includes(id)) {
            return (
                <div className="accepted-row">
                    <p>Request Accepted</p>
                </div>
            )
        } else if(denied.includes(id)) {
            return (
                <div className="denied-row">
                    <p>Request Denied</p>
                </div>
            )
        } else {
            return (
                <div className="accept-deny-row">
                    <DenyButton click={() => denyRequest(id)} />
                    <AcceptButton click={() => acceptRequest(id)}/>
                </div>
            )
        }
        
    }

    const displayFriendRequests = () => {
        return (
            <div>
                {props.otherUsers.map(obj => (
                    <div key={obj.id}
                        className="friend-request-users">
                        <div className='friend-request-main'>
                            
                            <div className="friend-request-card">
                                <Avatar
                                    userDetails={obj}
                                    profileImgUrl = {obj.profile_pic}
                                    hasProfileImg={obj.profile_pic}
                                    type="human"
                                    />
                                <p>{obj.fname} {obj.lname}</p>
                            </div>
                            <div className="time-sent">
                                <FormatTime format="small" time={timeSent(obj.id)} />
                            </div>
                        </div>
                        {decisionRow(obj.id)}
                    </div>
                ))}
            </div>
        )
    }

    const acceptRequest = (id) => {
        console.log(id)
        acceptFriendRequest(id)
        .then(res => {
            setAccepted(accepted => [...accepted, id])
        })
        .catch(err => console.log(err))
    }

    const denyRequest = (id) => {
        denyFriendRequest(id)
        .then(res => {
            setDenied(denied => [...denied, id])
        })
        .catch(err => console.log(err))
    }

    useEffect(()=> {
        if(accepted.length !== 0 || denied.length !== 0) {
            setAccepted([]);
            setDenied([])
            props.resetNotifications()
        }
    }, [props.expanded === 0])

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
                <h2>Friend Requests</h2>
                {props.friendRequests === 0 ? 'No results...' : 
                    props.expanded === 0 ? 
                        '' : props.friendRequests.length === 0 ? 'no results' :
                                displayFriendRequests()
                }
                
            </div>
        </div>
    )
}