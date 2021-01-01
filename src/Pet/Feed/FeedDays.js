import { useState } from 'react';
import FormatTime from '../../HelperComponents/FormatTime';
import { TodaysDate, TwoDaysAgo,  SevenDaysAgo, ThirtyDaysAgo } from '../../HelperComponents/TodaysDate';
import '../pet.scss';


function FeedDays(props) {
    const [timeline, setTimeline] = useState(1)

    const twoDaysAgo = () => {
        var d = new Date();
        d.setDate(d.getDate() - 2);

    }

    return (
        <div>
            <TimeSelect 
                selected={timeline}
                timelineSelect={(e) => setTimeline(e)}/>
             {props.eatData.filter(obj => 
                obj.time_select < TodaysDate() && obj.time_select > TwoDaysAgo()
             ).map(obj => (
                <div key={obj.id}>
                    <FormatTime
                        time={obj.time_select}/>
                    <p>{obj.feed_amount}</p>
                    <p>{obj.amount_ate}</p>
                </div>
            ))}
            {console.log(timeline)}
        </div>
    )
}
export default FeedDays;

function TimeSelect(props) {


    return (
        <div className="nowto-thirty-bar">
            <div className={props.selected === 1 ? 'selected' : ''}>
                <p 
                    value='1'
                    onClick={() => props.timelineSelect(1)}>yesterday</p>
            </div>
            <div className={props.selected === 3 ? 'selected' : ''}>
                <p 
                    value='3'
                    onClick={() => props.timelineSelect(3)}>past 3 days</p>
            </div>
            <div className={props.selected === 7 ? 'selected' : ''}>
                <p 
                    value='7'
                    onClick={() => props.timelineSelect(7)}>past week</p>
            </div>
            <div className={props.selected === 30 ? 'selected' : ''}>
                <p 
                    value='30'
                    onClick={() => props.timelineSelect(30)}>past month</p>
            </div>
        </div>
    )
}