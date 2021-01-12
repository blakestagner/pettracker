import Avatar from '../User/Avatar';
import bdayIcon from '../img/icons/bday.svg';
import petIcon from '../img/icons/pets.svg';
import Loading from '../HelperComponents/Loading';
import { useEffect, useState, useRef } from 'react';
import ButtonIcon from '../Inputs/ButtonIcon'
import petsIcon from '../Inputs/icons/pets.svg';
import foodIcon from '../img/icons/food.svg';
import peeIcon from '../img/icons/pee.svg';
import poopIcon from '../img/icons/poop.svg';
import { useHistory } from 'react-router-dom';
import FileUpload from '../img/FileUpload'

function PetProfile(props) {

    let history = useHistory();
    const handleClick = () => {
        history.push('/register-pet');
    }

    return (
        <div>
            {props.userDetails.pet_id ?
                <PetProfileDetails
                    petDetails={props.petDetails} 
                    userDetails={props.userDetails}
                    /> 
                : 
                props.userDetails.pet_id !== 0 ? 
                'Yes pets' : 
                <ButtonIcon 
                    name="Register a Pet" 
                    icon={petsIcon} 
                    onClick={() => handleClick()}/>    
            }
        </div>
    )
}
export default PetProfile;

function PetProfileDetails({petDetails, userDetails}) {
    const [isLoading, doneLoading] = useState(true);
    const [newUpload, setUpload] = useState(0);
    const toggleImageUploadRef = useRef();

    useEffect(() => {
        doneLoading(false)
    }, [])

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
                        <p>I eat {petDetails.feed_perday} times a day</p>               
                    </div>
                </div>
            </div>
            <div>
                <div className="row-of-rows">
                    <img
                        className="img-icon" 
                        src={foodIcon} 
                        alt="Bday"/>
                    <h3 style={{textAlign: 'left'}}>Feed Schedule</h3>
                </div>
                    <p>{petDetails.feed_perday} Mealsper Day</p>
                    <p>Add section to show when they eat and for users to edit when they eat, add another meal or delete another meal</p>
                <div className="row-of-rows">   
                    <img
                        className="img-icon" 
                        src={peeIcon} 
                        alt="pee"/>
                    <h3 style={{textAlign: 'left'}}>{petDetails.name}'s potty</h3>
                </div>
                    <p>Section for avg Pee per day, avg poop per day, just avg everything from past 3 days, past week, past month</p>

                <div className="row-of-rows">
                    <img
                        className="img-icon" 
                        src={poopIcon} 
                        alt="poop"/>
                    <h3 style={{textAlign: 'left'}}>{petDetails.name}'s poop</h3>
                </div>
                    <p>Section for avg Pee per day, avg poop per day, just avg everything from past 3 days, past week, past month</p>
                    <p>show percentage of normal and wet poops</p>
            </div>
            <FileUpload
                    ref={toggleImageUploadRef}
                    show={newUpload}
                    type="pet"/>
        </div>
    )
}