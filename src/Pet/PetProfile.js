import Avatar from '../User/Avatar';
import bdayIcon from '../img/icons/bday.svg';
import petIcon from '../img/icons/pets.svg';
import Loading from '../HelperComponents/Loading';
import { useEffect, useState, useRef } from 'react';
import ButtonIcon from '../Inputs/ButtonIcon'
import petsIcon from '../Inputs/icons/pets.svg';
import foodIcon from '../img/icons/food.svg';
import { useHistory } from 'react-router-dom';
import FileUpload from '../img/FileUpload';
import PetProfileMenu from './PetProfileMenu'

function PetProfile(props) {

    let history = useHistory();
    const handleClick = () => {
        history.push('/register-pet');
    }


    const updatePetProfileImage = () => {
        props.updatePetImage()
    }

    return (
        <div className="profile-main">
            {props.userDetails.pet_id !== 0?
                <PetProfileDetails
                    updatePetImage={() => updatePetProfileImage()}
                    currentPet={props.currentPet}
                    petDetails={props.petDetails} 
                    userDetails={props.userDetails}
                    /> 
                : 
                <ButtonIcon 
                    name="Register a Pet" 
                    icon={petsIcon} 
                    onClick={() => handleClick()}/>    
            }
        </div>
    )
}
export default PetProfile;

function PetProfileDetails({petDetails, userDetails, currentPet, updatePetImage}) {
    const [isLoading, doneLoading] = useState(true);
    const [newUpload, setUpload] = useState(0);
    const toggleImageUploadRef = useRef();

    useEffect(() => {
        doneLoading(false)
    }, [petDetails])

    const birthdayConvert = (date) => {
        if(date === undefined ) {
            return ''
        } else {
            let year = date.split('-')[0];
            let month = date.split('-')[1]
            let day = date.split('-')[2].split('T')[0]
            return `${day}-${month}-${year}`
        }
    }

    const uploadNewImg = () => {
        setUpload(1)
        toggleImageUploadRef.current.toggleImageUpload()
    }

    const updatePetProfileImage = () => {
        updatePetImage()
    }


    if(isLoading === true) {
        return <Loading />
    }

    return (
        <div>
            <p className="header-text">{petDetails.name}'s<span> Profile</span></p>
            <div className="icon-text-row">
                <div style={{margin: '0 auto'}}>
                    <Avatar
                        petDetails={petDetails}
                        userDetails={userDetails}
                        petProfileImgUrl={petDetails.profile_pic}
                        type="pet-profile"
                        uploadImg={uploadNewImg}
                        />
                </div>
                <div style={{margin: '0 auto'}}>
                    <div className="row-of-rows">
                        <img
                            className="img-icon" 
                            src={petIcon} 
                            alt="Name"/>
                        <p>{petDetails.name}</p>
                    </div>
                    <div className="row-of-rows">
                        <img
                            className="img-icon" 
                            src={bdayIcon} 
                            alt="Bday"/>
                        <p>{birthdayConvert(petDetails.birthday)}</p>               
                    </div>
                    <div className="row-of-rows">
                        <img
                            className="img-icon" 
                            src={foodIcon} 
                            alt="Bday"/>
                        <p>Eats {petDetails.feed_perday}x daily</p>               
                    </div>
                </div>
            </div>
            <PetProfileMenu 
                petDetails={petDetails}/>
            <FileUpload
                updatePetProfileImage={() => updatePetProfileImage()}
                ref={toggleImageUploadRef}
                show={newUpload}
                type="pet"/>
        </div>
    )
}