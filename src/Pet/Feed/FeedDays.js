import { useState, useEffect } from 'react';
import FormatTime from '../../HelperComponents/FormatTime';
import { TodaysDate, TwoDaysAgo,  SevenDaysAgo, ThirtyDaysAgo } from '../../HelperComponents/TodaysDate';
import '../pet.scss';
import TimeSelectMenu from '../TimeSelectMenu';


function FeedDays(props) {
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
    const yesterdayEatAverage = () => {
        let dataCount = filterTime(props.eatData);
        let eatData = 0
        for(let i = 0; i < dataCount.length; i++) {
            eatData += parseInt(dataCount[i].amount_ate)
        }   
        let eatDataAvg = dataCount.length/ eatData;

        const roundNumber = (num) => {
            return Math.round((num * 100) * 10) / 10; 
        }

        return (
            <p>Ate {roundNumber(eatDataAvg)}%</p>
        )
    }
    const yesterdayFedAverage = () => {
        let dataCount = filterTime(props.eatData);
        let eatData = 0
        for(let i = 0; i < dataCount.length; i++) {
            eatData += parseInt(dataCount[i].feed_amount.split(' ')[0])

        }   
        let eatDataAvg = eatData / dataCount.length;
        return (
            <p>Ate {eatDataAvg} Tbsp</p>
        )
    }

    const handleChange = (e) => {
        setDay(e)
    }

    return (
        <div>
            <TimeSelectMenu timeline={(day) => handleChange(day)}/>
            <div className="today-avg"> 
               {yesterdayEatAverage()}
               {yesterdayFedAverage()}
            </div>
             {filterTime(props.eatData).map(obj => (
                <div key={obj.id}>
                    <FormatTime
                        time={obj.time_select}/>
                    <p>{obj.feed_amount}</p>
                    <p>{obj.amount_ate}</p>
                </div>
            ))}
        </div>
    )
}
export default FeedDays;
