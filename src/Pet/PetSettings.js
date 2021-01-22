import { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {setFeedTime, getFeedTime } from '../Autho/Repository';
import FoodIcon from '../img/icons/food.svg';
import ArrowDown from '../img/icons/arrow_down_grey.svg';
import ArrowDownWhite from '../img/icons/arrow_down.svg';
import ArrowUp from '../img/icons/arrow_up_grey.svg';
import ButtonFullWidth from '../Inputs/ButtonFullWidth';

function PetSettings(props) {
    const [feedTime, setFeedTime] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [settingsDetail, setSettingDetail] = useState('')
    const settingsDetailsRef = useRef();

    useEffect(()=> {
        if(props.open === "Setting") {
            getFeedTime(props.petDetails.id)
                .then(res => {
                    console.log(res)
                    setFeedTime(res)
                })
                .catch(err => console.log(err))
        }
    }, [props])

    const refHandler = (type) => {
        settingsDetailsRef.current.settingsDetailsRef()
        switch(type) {
            case 'feed times':
                return setSettingDetail('Feed Times')
            default:
        }
    }

    const expandSettings = (id) => {
        if(expanded === id) {
            setExpanded(null)
        } else {
            setExpanded(id)
        }
    }

    return (
        <div className="main-body">
            <div className="row-of-rows">
                <img
                    className="img-icon" 
                    src={FoodIcon} 
                    alt="Bday"/>
                <h3 style={{textAlign: 'left'}}>Feed Schedule</h3>
                <img
                    onClick={() => expandSettings('feed schedule')}
                    className="arrow-icon" 
                    src={expanded === 'feed schedule' ? ArrowUp : ArrowDown} 
                    alt="Bday"/>
            </div>
            <div className={expanded === 'feed schedule' ? 
                            'settings-open' : 'settings-closed'}>
                {feedTime.length === 0 ? 
                <div className="full-width">
                    <p className="helper-message">We didnt find any feed times for {props.petDetails.name}</p>
                    <div className="row-of-rows right-align">
                        <ButtonFullWidth 
                            name="Add Feed Times"
                            click={() => refHandler('feed times')} 
                            />
                    </div>
                </div> :
                'more than 1'}
            </div>
            <SettingsDetail 
                settingsDetail={settingsDetail}
                ref={settingsDetailsRef}/>
        </div>
    )
}
export default PetSettings;


const SettingsDetail = forwardRef((props, ref) => {
    const [loading, doneLoading ] = useState(true);
    const [show, hide] = useState(0);


    useEffect(() => {

        doneLoading(0)
    }, [props])

    useImperativeHandle(ref, () => ({
        settingsDetailsRef() {
            toggle()
        }
      }));

    const toggle = () => {
        if(show === 0) {
            hide(1)
        } else {
            hide(0)
        }
    }

    const displayFeedTime = () => {

        return (
            <div>
                <p>Feed time</p>
            </div>
        )
    }


    const settingType = (type) => {
        console.log('activated')
        switch(type) {
            case 'Feed Times':
                return displayFeedTime()
            default:
        }
    }



    if(loading) {
        return (
            <div>
                <p>loading</p>
            </div>
        )
    }

    return (
        <div 
            className={show === 0 ? 
                'image-upload-body disabled' :
                'image-upload-body active'}>

            <div className="image-upload-title">
                <h1>{props.settingsDetail}</h1>
                <div
                    onClick={() => toggle()} 
                    className="close-image-upload">
                    <img alt="close" src={ArrowDownWhite} />
                </div>
            </div>
            <div className="slide-up-main">
                {show === 1 ? 
                    settingType(props.settingsDetail)
                    : ''}
            </div>  
        </div>
    )
})