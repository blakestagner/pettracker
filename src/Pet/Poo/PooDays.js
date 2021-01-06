import { useState, useEffect } from 'react';
import FormatTime from '../../HelperComponents/FormatTime';
import { TodaysDate, TwoDaysAgo,  SevenDaysAgo, ThirtyDaysAgo } from '../../HelperComponents/TodaysDate';
import '../pet.scss';
import TimeSelectMenu from '../TimeSelectMenu';


function PooDays(props) {
    const [day, setDay] = useState(0)

    const filterTime = (data) => {
        let filterDate = () => {
            switch(day) {
                case 0:
                    return (
                        data.filter(obj => obj.time_select.split('T')[0] === TodaysDate())
                    )
                case 1:
                    return (
                        data.filter(obj => obj.time_select.split('T')[0] === TwoDaysAgo())
                    )
                case 2:
                    return (
                        data.filter(obj => obj.time_select.split('T')[0] > SevenDaysAgo())
                    )
                case 3:
                    return (
                        data.filter(obj => obj.time_select.split('T')[0] > ThirtyDaysAgo())
                    )
            }
        }

        return filterDate()
    }

    const yesterdayMissedAverage = () => {
        let dataCount = filterTime(props.pooData);
        let pooData = 0
        for(let i = 0; i < dataCount.length; i++) {
            pooData += parseInt(dataCount[i].missed)

        }   
        let pooDataAvg = Math.round((pooData / dataCount.length) * 10000) / 100;
        return (
            <p>Hit the spot {pooDataAvg}% of the time!</p>
        )
    }

    const handleChange = (e) => {
        setDay(e)
    }

    return (
        <div>
            <TimeSelectMenu timeline={(day) => handleChange(day)}/>
            <div className="today-avg"> 
            {yesterdayMissedAverage()}
            </div>
             {filterTime(props.pooData).map(obj => (
                <div key={obj.id}>
                    <FormatTime
                        time={obj.time_select}/>
                    <p>{obj.missed}</p>
                </div>
            ))}
        </div>
    )
}
export default PooDays;
