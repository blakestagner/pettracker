import ButtonIcon from '../Inputs/ButtonIcon';
import petsIcon from '../Inputs/icons/pets.svg';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPetPeeInfo } from '../Autho/Repository';

function Home(props) {
    let history = useHistory();
    
    const handleClick = () => {
        history.push('/register-pet');
    }

    return (
        <div>
            <h1>HOME</h1>
            {props.petDetails.name}
            {props.userDetails.pet_id != 0 ? 
            <div>
                <PetPeePosts 
                    petDetails={props.petDetails}/>
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

function PetPeePosts( {petDetails} ) {
    const [peeData, setPeeData] = useState(null)

    useEffect(() => {
        const helperFunction = () => {
            getPetPeeInfo(petDetails.id)
                .then(res => setPeeData(res))
                .catch(err => console.log(err))
        }
        helperFunction()
    }, [petDetails])

    const displayPeeData = () => {
        return <div>
                    {peeData.map(obj => (
                    <div key={obj.id}>
                        <p>{obj.time_select}</p>
                        <p>{obj.missed}</p>
                    </div>
                    ))}
                </div>
    }

    return (
        <div>
            <h2>Pee Data</h2>
            {peeData ? displayPeeData() : ''}
        </div>
    )
}