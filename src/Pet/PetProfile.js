import { useState, useEffect } from 'react';

import RegisterPet from './RegisterPet';

function PetProfile(props) {


    return (
        <div>
            <h1>Pet Profile</h1>
            <p>{props.userDetails.fname}</p>
            {props.petDetails ? 'Yes pets' : <RegisterPet userId={props.userDetails.id} />}
        </div>
    )
}
export default PetProfile;