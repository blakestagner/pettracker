import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import './user.scss'
import PetsIcon from '../img/icons/pets.svg';
import Loading from '../HelperComponents/Loading';
import {getMyPetDetails} from '../Autho/Repository';
import Avatar from './Avatar';

function UserPets(props) {
    const [isLoading, doneLoading] = useState(true);
    const [petDetails, setPetDetails] = useState(null);


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
                    </div>
                ))}
            </div>  
        )
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
        </div>
    )
}
export default UserPets;