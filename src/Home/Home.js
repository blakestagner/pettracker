import ButtonIcon from '../Inputs/ButtonIcon';
import petsIcon from '../Inputs/icons/pets.svg';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPetEatInfo, getPetPeeInfo, getPetPooInfo } from '../Autho/Repository';
import FeedActivity from '../Pet/Feed/FeedActivity'

function Home(props) {
    let history = useHistory();
    
    const handleClick = () => {
        history.push('/register-pet');
    }

    return (
        <div>
            {props.userDetails.pet_id != 0 ? 
            <div>
                <h1>Home</h1>

            </div> 
            : 
            <ButtonIcon 
                name="Register a Pet" 
                icon={petsIcon} 
                onClick={() => handleClick()}/>}

        </div>
    )
}
export default Home;