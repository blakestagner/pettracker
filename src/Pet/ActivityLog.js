import {useState, useEffect, useImperativeHandle, forwardRef} from "react";
import './pet.scss';
import foodIcon from '../img/icons/food.svg';
import peeIcon from '../img/icons/pee.svg';
import poopIcon from '../img/icons/poop.svg';
import walkIcon from '../img/icons/walk.svg';
import arrowDownIcon from '../img/icons/arrow_down.svg';
import Avatar from '../User/Avatar';

import ActivityForm from './ActivityForm';


const ActivityLog = forwardRef((props, ref) => {
    const [toggleActivity, setActivityToggle] = useState(0);
    const [selectedActivity, setActivity] = useState('Post');

    const handleClick = (evt) => {
      console.log(evt)
      switch(evt.target.name) {
        case 'Post':
          return setActivity('Post')
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
      setActivity('Post');
    }

    useImperativeHandle(ref, () => ({
        toggle() {
          setActivityToggle(1)
        }
      }));


    useEffect(()=> {

      const highlight = document.querySelector('#activity-highlight-selection')
      const menu = document.querySelector('#activity-select-parent')
      const firstChild = menu.childNodes[0];
      const secondChild = menu.childNodes[1];
      const thirdChild = menu.childNodes[2];
      const fourthChild = menu.childNodes[3];
      const fifthChild = menu.childNodes[4];
      highlight.style.width = `${firstChild.getBoundingClientRect().width}px`
      switch(selectedActivity) {
          case 'Post':
              highlight.style.left = `${firstChild.getBoundingClientRect().left}px`;
              break;
          case 'Eat':
              highlight.style.left = `${secondChild.getBoundingClientRect().left}px`;
              break;
          case 'Pee':
              highlight.style.left = `${thirdChild.getBoundingClientRect().left}px`;
              break;
          case 'Poop':
              highlight.style.left = `${fourthChild.getBoundingClientRect().left}px`;
              break;
          case 'Walk':
              highlight.style.left = `${fifthChild.getBoundingClientRect().left}px`;
              break;
          default:
      }
    }, [selectedActivity, toggleActivity])

    return (
        <div 
            className={toggleActivity ? 'activity-log-open' : 'activity-log-closed'} 
            id="activity-log">
            <div
              className="activity-log-top">
              <div className="main">
                <div>
                  <p>Activity Log</p>
                  <h2>What did {props.petDetails.name} do?</h2> 
                </div>   
                <img
                    alt="close all"
                    onClick={() => closeAll() }
                    src={arrowDownIcon}/>
                </div>
                  <div className='avatar'>
                    <Avatar
                      petDetails={props.petDetails}
                      userDetails={props.userDetails}
                      petProfileImgUrl = {props.petDetails.profile_pic}
                      type="pet-select"/>
                  </div>
            </div>

            <div>
              <div style={{margin: '10px'}}>
                  <div
                      id="activity-select-parent">
                        <div
                          onClick={() => setActivity('Post')}  
                          className="profile-information-icon">
                          <img
                              alt='Activity'
                              src={foodIcon} />
                              <p>Post</p>
                      </div>
                      <div
                          onClick={() => setActivity('Eat')}  
                          className="profile-information-icon">
                          <img
                              alt='Activity'
                              src={foodIcon} />
                              <p>Eat</p>
                      </div>
                      <div
                          onClick={() => setActivity('Pee')}  
                          className="profile-information-icon">
                          <img
                              alt='Activity'
                              src={peeIcon} />
                              <p>Pee</p>
                      </div>
                      <div
                          onClick={() => setActivity('Poop')} 
                          className="profile-information-icon">
                          <img
                              alt='Owner'
                              src={poopIcon} />
                              <p>Poop</p>
                      </div>
                      <div
                          onClick={() => setActivity('Walk')}  
                          className="profile-information-icon">
                          <img
                              alt='Setting'
                              src={walkIcon} />
                              <p>Walk</p>
                      </div>
                  </div>
                  <div id="activity-highlight-selection-container">
                      <div id="activity-highlight-selection"></div>
                  </div>
              </div>
            </div>
            <ActivityForm 
              close={() => closeAll()}
              petDetails={props.petDetails}
              userDetails={props.userDetails}
              activitySelected={selectedActivity}
              />
              {/*{selectedActivity ? 
                (
                  <ActivityForm 
                    close={() => closeAll()}
                    petDetails={props.petDetails}
                    userDetails={props.userDetails}
                    activitySelected={selectedActivity}
                    />
                )
                  :
                (
                  <div>  
                    <div 
                      name="Post"
                      onClick={() => setActivity('Post')}
                      className="post-to-feed"> 
                      <img 
                          src={foodIcon}
                          name="Post"
                          alt="post button"
                          onClick={() => setActivity('Post')}/>
                          <p>Post to feed</p>
                    </div>
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
                </div>
                )
              }*/}
        </div>
    )
})
export default ActivityLog;

/*function ActivityButton(props) {
  
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
          alt="back"
          name='back'
          onClick={props.handleClick()}
          src={backIcon}/>
      </button>
    </div>
  )
}*/