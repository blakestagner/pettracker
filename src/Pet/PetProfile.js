import RegisterPet from './RegisterPet';
import Avatar from '../User/Avatar';
import bdayIcon from '../img/icons/bday.svg';
import petIcon from '../img/icons/pets.svg';
import Loading from '../HelperComponents/Loading';
import { useEffect, useState } from 'react';
import ButtonIcon from '../Inputs/ButtonIcon'
import petsIcon from '../Inputs/icons/pets.svg';
import foodIcon from '../img/icons/food.svg';
import { useHistory } from 'react-router-dom';

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
                props.userDetails.pet_id != 0 ? 
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
    const [isLoading, doneLoading] = useState(true)
    const [pet, setPet] = useState()

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
                        petProfileImgUrl = { 
                            petDetails.id+
                            petDetails.name}
                        type="pet-large"
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
                <h3 style={{textAlign: 'left'}}>Feed Schedule</h3>
                <p>{petDetails.feed_perday} Mealsper Day</p>
                <p>Add section to show when they eat and for users to edit when they eat, add another meal or delete another meal</p>
                

                <h3 style={{textAlign: 'left'}}>{petDetails.name}'s uranations</h3>
                <p>Section for avg Pee per day, avg poop per day, just avg everything from past 3 days, past week, past month</p>

                <h3 style={{textAlign: 'left'}}>{petDetails.name}'s poops</h3>
                <p>Section for avg Pee per day, avg poop per day, just avg everything from past 3 days, past week, past month</p>
                <p>show percentage of normal and wet poops</p>
            </div>
        </div>
    )
}