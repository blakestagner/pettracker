import {useEffect, useState, useImperativeHandle, forwardRef} from "react";
import './pet.scss';
import petsIcon from '../Inputs/icons/pets.svg';
import foodIcon from '../img/icons/food.svg';
import foodBlackIcon from '../img/icons/food_black.svg';
import peeIcon from '../img/icons/pee.svg';
import peeBlackIcon from '../img/icons/pee_black.svg';
import poopIcon from '../img/icons/poop.svg';
import poopBlackIcon from '../img/icons/poop_black.svg';
import walkIcon from '../img/icons/walk.svg';
import walkBlackIcon from '../img/icons/walk_black.svg';
import backIcon from '../img/icons/arrow_back_white.svg';
import closeIcon from '../img/icons/close.svg';
import Avatar from '../User/Avatar';

import ActivityForm from './ActivityForm';


const ActivityLog = forwardRef((props, ref) => {
    const [toggleActivity, setActivityToggle] = useState(0);
    const [selectedActivity, setActivity] = useState(0);

    const handleClick = (evt) => {
      switch(evt.target.name) {
        case 'Eat':
          return setActivity('Eat');
        case 'Pee':
          return setActivity('Pee');
        case 'Poop':
          return setActivity('Poop');
        case 'Walk':
          return setActivity('Walk');
        default:
          return setActivity(0)
      }
    }
    const closeAll = () => {
      setActivityToggle(0);
      setActivity(0);
    }

    useImperativeHandle(ref, () => ({
        toggle() {
          setActivityToggle(1)
        }
      }));

    return (
        <div 
            className={toggleActivity ? 'activity-log-open' : 'activity-log-closed'} 
            id="activity-log">
            {!selectedActivity ? 
              (
              <button
                className="back-button">
                <img
                  onClick={() => closeAll() }
                  src={closeIcon}/>
              </button>
              )
            : ''}
            <div>
              {selectedActivity ? 
                (
                <ActivitySelectedBar
                  petDetails={props.petDetails}
                  userDetails={props.userDetails}
                  activitySelected={selectedActivity}
                  handleClick={() => handleClick}
                  />
                ) 
                  :
                ''}
            </div>
            <div className="activitylog-profile-card">
              <h1>What did {props.petDetails.name} do?</h1>
              <Avatar
                  petDetails={props.petDetails}
                  userDetails={props.userDetails}
                  petProfileImgUrl = { 
                      props.petDetails.id+
                      props.petDetails.name}
                  type="pet-large"
                  />
            </div>
              {selectedActivity ? 
                (
                  <ActivityForm 
                    petDetails={props.petDetails}
                    userDetails={props.userDetails}
                    activitySelected={selectedActivity}
                    />
                )
                  :
                (
                <div 
                  className="activity-log-grid">
                  <ActivityButton 
                      img={foodIcon}
                      name="Eat"
                      alt="food button"
                      handleClick={() => setActivity('Eat')}/>
                  <ActivityButton 
                      img={peeIcon}
                      name="Potty"
                      alt="pee icon"
                      handleClick={() => setActivity('Pee')}/>
                  <ActivityButton 
                      img={poopIcon}
                      name="Poop"
                      alt="pee icon"
                      handleClick={() => setActivity('Poop')}/>
                  <ActivityButton 
                      img={walkIcon}
                      name="Walk"
                      alt="pee icon"
                      handleClick={() => setActivity('Walk')}/>
                </div>
                )
              }
        </div>
    )
})
export default ActivityLog;

function ActivityButton(props) {
  
  return (
    <div className="activity-icon-container">
      <img 
        className="activity-icon"
        src={props.img}
        alt={props.alt}
        onClick={props.handleClick}/>
      <p>{props.name}</p>
    </div>
  )

}
function ActivitySelectedBar(props) {

  const activitySelectedClass = (activity) => {
    return props.activitySelected === activity ? 
      'activity-icon-small selected' : 'activity-icon-small'
  }

  return (
    <div 
      className='activity-icon-bar'>
      <div className='activity-log-items'>
        <img 
          className={activitySelectedClass('Eat')}
          src={props.activitySelected === 'Eat' ? foodIcon : foodBlackIcon}
          name='Eat'
          alt='food icon'
          onClick={props.handleClick()}/>
        <img 
          className={activitySelectedClass('Pee')}
          src={props.activitySelected === 'Pee' ? peeIcon : peeBlackIcon}
          name='Pee'
          alt='pee icon'
          onClick={props.handleClick()}/>
        <img 
          className={activitySelectedClass('Poop')}
          src={props.activitySelected === 'Poop' ? poopIcon : poopBlackIcon}
          name='Poop'
          alt='poop icon'
          onClick={props.handleClick()}/>
        <img 
          className={activitySelectedClass('Walk')}
          src={props.activitySelected === 'Walk' ? walkIcon : walkBlackIcon}
          name='Walk'
          alt='walk icon'
          onClick={props.handleClick()}/>
        </div>
        <button
        className="back-button-bar">
        <img
          name='back'
          onClick={props.handleClick()}
          src={backIcon}/>
      </button>
    </div>
  )
}