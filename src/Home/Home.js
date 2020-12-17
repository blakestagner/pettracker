import { useState, useEffect } from 'react';
import ButtonIcon from '../Inputs/ButtonIcon';
import petsIcon from '../Inputs/icons/pets.svg';
import { useHistory } from 'react-router-dom';

function Home(props) {
    let history = useHistory();
    const handleClick = () => {
        history.push('/pet-profile');
    }

    return (
        <div>
            <h1>HOME</h1>
            {props.petDetails ? 'Yes pets' : <ButtonIcon name="Register a Pet" icon={petsIcon} onClick={() => handleClick()}/>}
            <p>{props.userDetails.fname}</p>
        </div>
    )
}
export default Home;