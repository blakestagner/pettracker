import { useState, useEffect } from 'react';
import './pet.scss';
import leftIcon from '../img/icons/left.svg';
import rightIcon from '../img/icons/right.svg';


function TimeSelectMenu(props) {
    const [timeline, setTimeline] = useState(0);
    const [didMount, setDidMount] = useState(false);
    
    const container = document.querySelector('#nowto-thirty-inner')

    const leftRight = (direction) => {

        
        if(direction === 'right') {
            if (timeline === 3) {
                setTimeline(0)
            } else {
                setTimeline(timeline + 1)
            }

        } else {
            if (timeline === 0) {
                setTimeline(3)
            } 
            else { 
                setTimeline(timeline - 1)
            } 
        }
    }

    useEffect(() => {
        props.timeline(timeline)
        if (didMount === false) {
        } else {
            if(timeline === 0) {
                container.scrollLeft = '0px'
            }
            else if (timeline === 1) {
                container.scrollLeft = `${container.clientWidth / 4}`
            }
            else if(timeline === 3 || timeline === 2) {
                container.scrollLeft = container.clientWidth
            }
        }
        setDidMount(true)
    }, [timeline, didMount, props, container])

    return (
        <div className="nowto-thirty-container">
            <img
                alt="left arrow"
                onClick={() => leftRight('left')}
                src={leftIcon}/>
            <div className="nowto-thirty-inner" id="nowto-thirty-inner">
                <div className={timeline === 0 ? 'selected' : ''}>
                    <p 
                        value='0'
                        onClick={() => setTimeline(0)}>today</p>
                </div>
                <div className={timeline === 1 ? 'selected' : ''}>
                    <p 
                        value='1'
                        onClick={() => setTimeline(1)}>yesterday</p>
                </div>
                <div className={timeline === 2 ? 'selected' : ''}>
                    <p 
                        value='2'
                        onClick={() => setTimeline(2)}>past week</p>
                </div>
                <div className={timeline === 3 ? 'selected' : ''}>
                    <p 
                        value='3'
                        onClick={() => setTimeline(3)}>past month</p>
                </div>
            </div>
            <img
                alt="right arrow"
                onClick={() => leftRight('right')}
                    src={rightIcon}/>
        </div>
    )
}
export default TimeSelectMenu;