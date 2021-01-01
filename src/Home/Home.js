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
                <FeedActivity 
                    petDetails={props.petDetails}/>
                <br />
                <br />
                <PetPeePosts 
                    petDetails={props.petDetails}/>
                <PetPooPosts 
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


function PetPooPosts( {petDetails} ) {
    const [pooData, setPooData] = useState(null)

    useEffect(() => {
        const helperFunction = () => {
            getPetPooInfo(petDetails.id)
                .then(res => setPooData(res))
                .catch(err => console.log(err))
        }
        helperFunction()
    }, [petDetails])

    const displayPooData = () => {
        return <div>
                    {pooData.map(obj => (
                    <div key={obj.id}>
                        <p>{obj.time_select}</p>
                        <p>{obj.missed}</p>
                        <p>{obj.consistency}</p>
                    </div>
                    ))}
                </div>
    }

    return (
        <div>
            <h2>Poo Data</h2>
            {pooData ? displayPooData() : ''}
        </div>
    )
}