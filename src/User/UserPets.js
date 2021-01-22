import {useEffect, useState, useRef, useImperativeHandle, forwardRef} from 'react'
import { Link } from 'react-router-dom';
import './user.scss'
import Loading from '../HelperComponents/Loading';
import {
        getMyPetDetails, 
        removePetOwner, 
        removeMyPet, 
        getPetOwners, 
        sendPetRequest,
        getAllFriends,
        getOtherUsers,
        getSentPetRequests} from '../Autho/Repository';
import Avatar from './Avatar';
import EditButton from '../Inputs/EditButton';
import RemoveFriendIcon from '../img/icons/remove_friend_secondary.svg';
import ArrowDown from '../img/icons/arrow_down.svg';
import DeleteButton from '../Inputs/DeleteButton';
import DoubleConfirmButton from '../Inputs/DoubleConfirmButton';
import DeleteButtonSmall from '../Inputs/DeleteButtonSmall';
import IconButton from '../Inputs/IconButton';
import AddFriendIcon from '../img/icons/add_friend.svg'
import ButtonWhite from '../Inputs/ButtonWhite';


function UserPets(props) {
    const [isLoading, doneLoading] = useState(true);
    const [petDetails, setPetDetails] = useState(null);
    const [removed, setRemoved] = useState([]);
    const [removedUser, setRemovedUser] = useState([]);
    const [editPet, setEditPet] = useState(0);
    const [editStatus, setEditStatus] = useState([]);
    const  toggleEditPetRef = useRef();


    const displayPets = () => {
        return (
            <div className="friends-list-container">
                {petDetails.map(obj => (
                    <div
                        className="friends-list-details" 
                        key={obj.id}>
                        <Avatar
                            userDetails={obj}
                            petDetails={obj}
                            profileImgUrl = {obj.profile_pic}
                            hasProfileImg={obj.profile_pic}
                            type="pet"
                            />
                        <p>{obj.name}</p>
                        {displayUserActionRow(obj)}
                    </div>
                ))}
            </div>  
        )
    }

    const displayUserActionRow = (pet) => {
        if(removed.includes(pet.id)) {
            return (
                <div className="remove-user removed">
                    <p>removed</p>
                </div>
            )
        } 
        else if (editStatus.includes(pet.id)) {
            return (
                <div className="remove-user removed">
                    <p>updated</p>
                </div>
            )
        }
        else {
            return (
                <div className="remove-user">
                    <EditButton 
                        click={() => editPetHandler(pet)}
                        icon={RemoveFriendIcon}/>
                </div>
            )
        }
    }

    const editPetHandler = (pet) => {
        setEditPet(pet)
        toggleEditPetRef.current.toggleEditPetRef()
    }

    useEffect(()=> {
        const getMyPets = () => {
            let petIds = [];
            for (let i = 0; i < props.petList.length; i++){
                petIds[i] = props.petList[i]["pet_id"];
            }
            getMyPetDetails(petIds)
                .then(res => {
                    setPetDetails(res)
                })
                .catch(err => console.log(err))
                .finally(() => doneLoading(false))
        }

        getMyPets()
    }, [props])


    if(isLoading === true) {
        return <Loading />
    }
    return (
        <div className="user-pets">
            <h2>My Pets</h2>
            {props.petList.length === 0 ? 
                    <Link to="/register-pet">Add a Pet</Link> : 
                        isLoading === false && petDetails !== null ?
                            displayPets() : '' }
            <EditPet
                updateUserData={() => props.updateUserData()}
                ref={toggleEditPetRef} 
                userDetails={props.userDetails}
                editPet={editPet}
                removed={removed}
                petEditStatus={(pet) =>  
                    setEditStatus(editStatus => [...editStatus, pet])}
                removedUser={removedUser}
                removeUser={(user) =>  
                    setRemovedUser(removedUser => [...removedUser, user])}
                removedPet={(pet) =>  
                    setRemoved(removed => [...removed, pet])}
                resetEditPet={() => 
                    setEditPet(0)}/>
        </div>
    )
}
export default UserPets;

const EditPet = forwardRef((props, ref) => {
    const [show, hide] = useState(0);
    const [doubleConfirm, setDoubleConfirm] = useState(0);
    const [editOwners, setEditOwners] = useState(0);
    const [petOwners, setPetOwners] = useState(null);
    const [sentRequest, setSentRequest] = useState(null)
    const  addPetOwnerRef = useRef();


    const removePet = (id) => {
        console.log(id)
        removeMyPet(id)
            .then(res => {
                props.removedPet(id) 
                console.log(res)

            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                props.updateUserData()
                setTimeout(() => { hide(0)}, 1000)
            })
    }

    const doubleConfirmHandler = () => {
        if (doubleConfirm === 0 ) {
            setDoubleConfirm(1);
            setEditOwners(0);
        } else setDoubleConfirm(0);
    }

    const displayDoubleConfirm = () => {
        if(props.removed.includes(props.editPet.id)) {
            return (
                <div className="double-confirm-removed">
                    <p>removed</p>
                </div>
            )
        } else if(props.editPet.id === props.userDetails.pet_id) {
            return (
                <div>
                    <p>This is your current, if this is your only pet please create a new pet to remove this pet.</p>
                </div>
            )
        }
        
        else {
            return (
                <div className="double-confirm" style={{margin: 'auto'}}>
                    <p>Are you sure? </p>
                    <DoubleConfirmButton 
                        type="yes" 
                        title="Yes" 
                        click={() => removePet(props.editPet.id)}/>
                    <DoubleConfirmButton 
                        type="no" 
                        title="no" 
                        click={() => doubleConfirmHandler()}/>
                </div>
            )
        }
    }

    const editOwnersHandler = () => {
        if (editOwners === 0 ) {
            setEditOwners(1);
            setDoubleConfirm(0);
        } else setEditOwners(0);
    }

    const removeOwner = (id) => {
        removePetOwner( props.editPet.id, id)
            .then(res => {
                props.removeUser(id)
                console.log(res)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setTimeout(() => { hide(0)}, 1000)
            })
    }

    const displayOwners = () => {
        return (
            <div className="friends-list-container">
                {petOwners.map(obj => (
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

    const displayUserActionRow = (id) => {

        if(id === props.userDetails.id) {
            return (
                <div className="edit-owner-text">
                    current user
                </div>
            )
        } else if (id === props.editPet.owner_id) {
            return (
                <div className="edit-owner-text">
                    <p>owner</p>
                </div>           
            )
        } else if(props.removedUser.includes(id)) {
            return (
                <div className="edit-owner-text double-confirm-removed">
                    <p>removed</p>
                </div>
            )
        } else {
            return (
                <div className="edit-owner-text">
                    <DeleteButtonSmall click={() => removeOwner(id) }/>
                </div>
            )
        }
    }


    useImperativeHandle(ref, () => ({
        toggleEditPetRef() {
            toggle();
        }
      }));


    useEffect(() => {
        if(props.editPet === 0) {
            return;
        } else {
            getPetOwners(props.editPet.id)
                .then(res => {
                    let userIds = []
                    for (let i = 0; i < res.length; i++){
                            userIds[i] = res[i]["user_id"]
                    }
                    getOtherUsers(userIds)
                    .then(res => {
                        setPetOwners(res)
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            getSentPetRequests(props.editPet.id)
                .then(res=> {
                    setSentRequest(res)
                })
                .catch(err => console.log(err))
        }

    }, [props.editPet])
    
    

    const toggle = () => {
        if(show === 0) {
            hide(1)
        } else {
            setDoubleConfirm(0);
            setEditOwners(0);
            setPetOwners(null)
            props.resetEditPet();
            hide(0);
        }
    }
    return (
        <div className={show === 0 ? 'edit-pet disabled' : 'edit-pet active'}>
            <div className="edit-pet-title">
                <h1>Edit {props.editPet.name}</h1>
                <div
                    onClick={() => toggle()} 
                    className="edit-pet-close">
                    <img alt="close" src={ArrowDown} />
                </div>
            </div>
            <div style={{padding: '10px'}}>
                <div className="edit-pet-row">
                    <h3>Delete your pet?</h3>
                    <DeleteButton click={() => doubleConfirmHandler()} />
                </div>
                <div 
                    className={doubleConfirm === 0 ? 
                                'edit-pet-inner disabled' : 'edit-pet-inner active'}>
                        {props.userDetails.id === props.editPet.owner_id ?
                            doubleConfirm === 0 ? '' :
                            displayDoubleConfirm()
                            :
                            <p>You are not the current owner of {props.editPet.name}</p>
                        }
                </div>
                    
                <div className="edit-pet-row">
                    <h3>Edit pet Owners</h3>
                    <EditButton click={() => editOwnersHandler()} />
                </div>
                <div 
                    className={editOwners === 0 ? 
                                'edit-owner-inner disabled' : 'edit-owner-inner active'}>
                    <div className="edit-pet-row">
                        {editOwners === 0 ? '' :
                            displayOwners()
                        }
                        
                    </div>
                    <div className="edit-pet-row">
                        <p>Add another owner</p>
                        <IconButton 
                            click={() => addPetOwnerRef.current.addPetOwnerRef()}
                            icon={AddFriendIcon}/>
                    </div>
                    <AddPetOwner
                        sentRequest={sentRequest}
                        userDetails={props.userDetails}
                        editPet={props.editPet} 
                        ref={addPetOwnerRef}/>
                </div>
            </div>
        </div>
    )
})


const AddPetOwner = forwardRef((props, ref) => {
    const [loading, doneLoading ] = useState(true);
    const [friends, setFriends] = useState([])
    const [requestSent, setRequest] = useState([])

    const [show, hide] = useState(0);


    useEffect(() => {

        doneLoading(0)
    }, [props])

    useImperativeHandle(ref, () => ({
        addPetOwnerRef() {
            toggle()
        }
      }));

    const sendPetRequestHandler = (friend_id) => {
        sendPetRequest(friend_id, props.editPet.id)
            .then(res => {
                setRequest(requestSent => [...requestSent, friend_id])

            })
            .catch(err => console.log(err))
        /*sendPetRequest(friend_id, props.editPet.id)*/

    }

    const displayFriends = () => {
        return (
            <div className="friends-list-container">
                {friends.map(obj => (
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

    const displayUserActionRow = (id) => {
        if(props.sentRequest.some(obj => 
            obj.user_id === id && obj.pet_id === props.editPet.id )) {
                return (
                    <div className="remove-user">
                        <ButtonWhite
                            name='req sent'
                            />
                    </div>
                )
        } else if(requestSent.includes(id)) {
            return (
                <div className="remove-user">
                    <ButtonWhite
                        name='req sent'
                        />
                </div>
            )
        } else {
            return (
                <div className="remove-user">
                    <ButtonWhite
                        name='Add'
                        click={() => sendPetRequestHandler(id)}
                        />
                </div>
            )
        }
    }


    const toggle = () => {
        if(show === 0) {
            hide(1)
        } else {
            hide(0)
        }
    }

    useEffect(() => {
        if(show === 1) {
            getAllFriends()
            .then(res => {
                if(res === 0) {
                    return;
                } else {
                    let userIds = [];
                    for (let i = 0; i < res.length; i++){
                        if(props.userDetails.id === res[i]["user_two"]) {
                            userIds[i] = res[i]["user_one"];
                        } else if(props.userDetails.id === res[i]["user_one"]) {
                            userIds[i] = res[i]["user_two"];
                        }
                    }
                    getOtherUsers(userIds)
                        .then(res => {
                            setFriends(res)
                        })
                        .catch(err => console.log(err))
                        .finally(() => doneLoading(false))
                }
            })
            .catch(err => console.log(err))
        } else;
    }, [show])

    if(loading) {
        return (
            <div>
                <p>loading</p>
            </div>
        )
    }

    return (
        <div 
            className={show === 0 ? 
                'image-upload-body disabled' :
                'image-upload-body active'}>

            <div className="image-upload-title">
                <h1>Add another owner for {props.editPet.name}</h1>
                <div
                    onClick={() => toggle()} 
                    className="close-image-upload">
                    <img alt="close" src={ArrowDown} />
                </div>
            </div>
            <div className="slide-up-main">
                {friends.length === 0 ? 
                    <p>Add a freinds to add another owner for {props.editPet.name}</p> :
                    <div>
                        {friends.length > 0 ? 
                            displayFriends() : ''}
                    </div>
                    }
            </div>  
        </div>
    )
})
