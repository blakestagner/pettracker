import ButtonIcon from '../Inputs/ButtonIcon';
import petsIcon from '../Inputs/icons/pets.svg';
import { useHistory } from 'react-router-dom';

function Home(props) {
    let history = useHistory();
    
    const handleClick = () => {
        history.push('/register-pet');
    }

    return (
        <div>
            <h1>HOME</h1>
            {props.userDetails.pet_id != 0 ? 'Yes pets' : <ButtonIcon name="Register a Pet" icon={petsIcon} onClick={() => handleClick()}/>}

        </div>
    )
}
export default Home;