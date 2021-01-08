import ButtonIcon from '../Inputs/ButtonIcon';
import petsIcon from '../Inputs/icons/pets.svg';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import FeedActivity from '../Pet/Feed/FeedActivity';
import PeeActivity from '../Pet/Pee/PeeActivity';
import PooActivity from '../Pet/Poo/PooActivity';

import './timeline.scss'

function Timeline(props) {
    const [dataSet, setDataSet] = useState(0)
    let history = useHistory();
    
    const handleClick = () => {
        history.push('/register-pet');
    }

    return (
        <div>
            {props.userDetails.pet_id !== 0 ? 
            
            <div>
                <div className="timeline-select">
                    <button 
                        className={dataSet === 0 ? 'active' : ''} 
                        onClick={() => setDataSet(0)}>
                        <p>Eat</p>
                    </button>
                    <button 
                        className={dataSet === 1 ? 'active' : ''} 
                        onClick={() => setDataSet(1)}>
                        <p>Pee</p>
                    </button>
                    <button
                        className={dataSet === 2 ? 'active' : ''} 
                        onClick={() => setDataSet(2)}>
                        <p>Poop</p>
                    </button>
                </div>
                { dataSet === 0 ? (
                    <FeedActivity 
                        petDetails={props.petDetails}/>
                ) 
                    :
                ''}
                 { dataSet === 1 ? (
                    <PeeActivity 
                        petDetails={props.petDetails}/>

                ) 
                    :
                ''}
                 { dataSet === 2 ? (
                    <PooActivity
                        petDetails={props.petDetails}/>
                ) 
                    :
                ''}
            </div> 
            : 
            <ButtonIcon 
                name="Register a Pet" 
                icon={petsIcon} 
                onClick={() => handleClick()}/>}

        </div>
    )
}
export default Timeline;
