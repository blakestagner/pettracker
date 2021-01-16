import {useEffect, useState} from 'react'
import './user.scss'
import {getAllFriends, getOtherUsers, removeFriend } from '../Autho/Repository';
import Loading from '../HelperComponents/Loading';
import Avatar from './Avatar';
import ButtonSecondary from '../Inputs/ButtonSecondary';
import RemoveFriendIcon from '../img/icons/remove_friend_secondary.svg';


function Friends(props) {
    const [friends, setFriends] = useState([]);
    const [friendsDetails, setFriendDetails] = useState(null);
    const [isLoading, doneLoading] = useState(true);
    const [removed, setRemoved] = useState([])


    const displayFriends = () => {
        return (
            <div className="friends-list-container">
                {friendsDetails.map(obj => (
                    <div
                        className="friends-list-details" 
                        key={obj.id}>
                        <Avatar
                            userDetails={obj}
                            profileImgUrl = {obj.profile_pic}
                            hasProfileImg={obj.profile_pic}
                            type="human"
                            />
                        <p>{obj.fname} {obj.lname}</p>
                        {displayUserActionRow(obj.id)}
                    </div>
                ))}
            </div>  
        )
    }

    const removeFriendClick = (id) => {

        removeFriend(id)
        .then(res => {
            setRemoved(removed => 
                [...removed, id])
        })
        .catch(err => console.log(err))
    }

    const displayUserActionRow = (id) => {
        if(removed.includes(id)) {
            return (
                <div className="remove-user removed">
                    <p>removed</p>
                </div>
            )
        } else {
            return (
                <div className="remove-user">
                    <ButtonSecondary 
                        click={() => removeFriendClick(id)}
                        icon={RemoveFriendIcon}/>
                </div>
            )
        }
    }


    useEffect(() => {
        const friendsList = () => {
            getAllFriends()
            .then(res => {
                setFriends(res)
            })
            .catch(err => console.log(err))
        }
        friendsList()
        console.log('1')
    }, [props.expanded === true])


    useEffect(()=> {
        const getFriendDetails = () => {
            let userIds = [];
            for (let i = 0; i < friends.length; i++){
               if(props.userDetails.id === friends[i]["user_two"]) {
                    userIds[i] = friends[i]["user_one"];
               } else if(props.userDetails.id === friends[i]["user_one"]) {
                    userIds[i] = friends[i]["user_two"];
               }
            }
            getOtherUsers(userIds)
                .then(res => {
                    setFriendDetails(res)
                    console.log(res)
                })
                .catch(err => console.log(err))
                .finally(() => doneLoading(false))
        }

        getFriendDetails()
    }, [friends])

    

    if(isLoading === true) {
        return <Loading />
    }

    return (
        <div className="user-friends">
            <h2>Friends</h2>
                {friends.length === 0 ? 
                    'less then 0' : 
                        isLoading === false && friendsDetails !== null ?
                            displayFriends() : '' }
                
        </div>
    )
}
export default Friends;