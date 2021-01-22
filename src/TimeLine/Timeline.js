import ButtonIcon from '../Inputs/ButtonIcon';
import petsIcon from '../Inputs/icons/pets.svg';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FeedActivity from '../Pet/Feed/FeedActivity';
import PeeActivity from '../Pet/Pee/PeeActivity';
import PooActivity from '../Pet/Poo/PooActivity';
import FoodIcon from '../img/icons/food.svg'
import PeeIcon from '../img/icons/pee.svg'
import PoopIcon from '../img/icons/poop.svg'
import './timeline.scss';

function Timeline(props) {
    const [dataSet, setDataSet] = useState(0);
    let history = useHistory();
    
    const handleClick = () => {
        history.push('/register-pet');
    }


    useEffect(()=> {
        const highlight = document.querySelector('#highlight-selection')
        const menu = document.querySelector('#profile-information')
        const firstChild = menu.childNodes[0];
        const secondChild = menu.childNodes[1];
        const thirdChild = menu.childNodes[2];
        highlight.style.width = `${firstChild.getBoundingClientRect().width}px`

        switch(dataSet) {
            case 0:
                highlight.style.left = `${firstChild.getBoundingClientRect().left}px`;
                break;
            case 1:
                highlight.style.left = `${secondChild.getBoundingClientRect().left}px`;
                break;
            case 2:
                highlight.style.left = `${thirdChild.getBoundingClientRect().left}px`;
                break;
            default:
        }
    }, [dataSet])



    return (
        <div className="full-width">
            {props.userDetails.pet_id !== 0 ? 
            <div>
                <div
                    id="profile-information">
                    <div
                        onClick={() => setDataSet(0)}  
                        className="profile-information-icon">
                        <img
                            alt='Eat'
                            src={FoodIcon} />
                            <p>Activity</p>
                    </div>
                    <div
                        onClick={() => setDataSet(1)} 
                        className="profile-information-icon">
                        <img
                            alt='Pee'
                            src={PeeIcon} />
                            <p>Pee</p>
                    </div>
                    <div
                        onClick={() => setDataSet(2)}  
                        className="profile-information-icon">
                        <img
                            alt='Poop'
                            src={PoopIcon} />
                        
                            <p>Poop</p>
                    </div>
                </div>
                <div id="highlight-selection-container">
                    <div id="highlight-selection"></div>
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
