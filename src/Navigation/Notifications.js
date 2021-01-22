import {useEffect, useState} from 'react'
import CloseWhiteIcon from '../img/icons/close_white.svg';
import NotificationIcon from '../img/icons/notifications-grey.svg';
import { 
    getFriendRequest, 
    getOtherUsers, 
    acceptFriendRequest, 
    denyFriendRequest,
    getPetRequests,
    getAllPetInfo,
    acceptPetRequest,
    denyPetRequest } from '../Autho/Repository';
import Avatar from '../User/Avatar';
import FormatTime from '../HelperComponents/FormatTime';
import AcceptButton from '../Inputs/AcceptButton';
import DenyButton from '../Inputs/DenyButton';
import YesNoButton from '../Inputs/YesNoButton';



function Notifications(props) {
    const [expanded, setExpanded] = useState(0);
    const [friendRequests, setFriendRequest] = useState(0);
    const [otherUsers, setOtherUsers] = useState();
    const [petRequests, setPetRequests] = useState(0);

    const Toggle = () => {
        if(expanded === 0) {
            setExpanded(1)
        } else setExpanded(0)
    }

    const newFriendRequests = () => {

        getFriendRequest()
        .then(res => {
            setFriendRequest(res)
        })
        .catch(err => console.log(err))
    }

    const newPetRequests = () => {
        let userIds = [];
        let petIds = [];
        let created = [];
        let petUser = [];
        getPetRequests()
        .then(res => {
            created = res;
            for (let i = 0; i < res.length; i++){
               userIds[i] = res[i]["creator"]; 
               petIds[i] = res[i]["pet_id"];
            }
            getOtherUsers(userIds)
                .then(res => {
                    for (let i = 0; i < res.length; i++){
                        petUser[i] = res[i] 
                    }
                    getAllPetInfo(petIds)
                        .then(res => {
                            for (let i = 0; i < res.length; i++){
                                petUser[i].req_pet_Id = res[i]['id']
                                petUser[i].pet_profile_pic = res[i]['profile_pic']
                                petUser[i].name = res[i]['name']
                            }
                            petUser.map((item,i)=>{
                                if(item.id === created[i].creator){
                                    item.created = created[i]['created'];
                                    item.req_id = created[i]['id'];
                                } else;
                            })
                            setPetRequests(petUser)
                        })
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            
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
    
    const changePet = (id) => {
        props.changePet(id)
    }


    useEffect(() => {
        newFriendRequests()
        newPetRequests()
    }, [expanded])

    useEffect(() => {
        const getOtherUsersData = () => {
            let userIds = [];
            for (let i = 0; i < friendRequests.length; i++){
               userIds[i] = friendRequests[i]["user_one"];
            }
            getOtherUsers(userIds)
                .then(res => {
                    setOtherUsers(res)
                })
                .catch(err => console.log(err))
        }

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
                    changePet={(id) => changePet(id)}
                    petRequests={petRequests}
                    updateRequests={() => updateAll()}
                    resetNotifications={() => resetNotifications()}
                    expanded={expanded}
                    friendRequests={friendRequests} 
                    petRequests={petRequests}
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
    const [petAccepted, setPetAccepted] = useState([])
    const [petDenied, setPetDenied] = useState([])


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

    const acceptPetRequestHandler = (id) => {
        acceptPetRequest(id)
            .then(res => {
                setPetAccepted(accepted => [...accepted, id])
            })
            .catch(err => console.log(err))
    }

    const denyPetRequestHandler = (id) => {
        console.log(id)
        denyPetRequest(id)
            .then(res => {
                setPetDenied(denied => [...denied, id])
            })
            .catch(err => console.log(err))
    }

    const test = (id) => {
        console.log(id)
    }

    const petDecisionRow = (postId, petId) => {
        if(petAccepted.includes(postId)) {
            return (
                <div className="make-pet-row">
                    <p>Request Accepted</p>
                    <p>Set as current pet?</p>
                    {
                        <div>
                            <YesNoButton 
                                type="yes" 
                                title="Yes"
                                click={() => props.changePet(petId)}/>
                            <YesNoButton 
                                type="no" 
                                title="No"
                                click={() => test(petId)}/>
                        </div>
                    }
                </div>
            )
        } else if(petDenied.includes(postId)) {
            return (
                <div className="denied-row">
                    <p>Request Denied</p>
                </div>
            )
        } else {
            return (
                <div className="accept-deny-row">
                    <DenyButton click={() => denyPetRequestHandler(postId)} />
                    <AcceptButton click={() => acceptPetRequestHandler(postId)}/>
                </div>
            )
        }
        
    }

    const displayPetRequests = () => {
        return (
            <div>
                {props.petRequests.map(obj => (
                    <div key={obj.id}
                    className="friend-request-users">
                    <div className='friend-request-main'>
                        <div className="pet-request-card">
                            <div className="pet-request-pet">
                                <Avatar
                                    userDetails={obj}
                                    petDetails={obj}
                                    petProfileImgUrl={obj.pet_profile_pic}
                                    type="pet"
                                    />
                                <p>{obj.name} <span>pet</span></p>
                            </div>
                            <div className="pet-request-owner">
                                <Avatar
                                    userDetails={obj}
                                    profileImgUrl = {obj.profile_pic}
                                    hasProfileImg={obj.profile_pic}
                                    type="human-small"
                                    />
                                <p>{obj.fname} {obj.lname} <span>owner</span></p>
                            </div>
                        </div>
                        <div className="time-sent">
                            <FormatTime format="small" time={obj.created} />
                        </div>
                    </div>
                    {petDecisionRow(obj.req_id, obj.pet_id)}
                </div>
                ))}
            </div>
        )
    }

    useEffect(()=> {
        if(props.expanded === 0) {
            if(accepted.length !== 0 || denied.length !== 0) {
                setAccepted([]);
                setDenied([])
                props.resetNotifications()
            }
        } else;
    }, [props, accepted, denied])

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
                {props.friendRequests === 0 ? 'no results...' : 
                    props.expanded === 0 ? 
                        '' : props.friendRequests.length === 0 ? 'no results' :
                                displayFriendRequests()
                }
                
            </div>
            <div>
                <h2>Pet Requests</h2>
                {props.petRequests === 0 ? 'no results...' : 
                    props.expanded === 0 ? 
                        '' : props.petRequests.length === 0 ? 'no results' :
                                displayPetRequests()
                }
            </div>
        </div>
    )
}