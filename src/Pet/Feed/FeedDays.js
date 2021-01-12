import { useState} from 'react';
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
                default: 
            } 
        }

        return filterDate()
    }
    const yesterdayEatAverage = (dataSet) => {
        let dataCount = filterTime(props.eatData);
        let totalAte = 0;
        let totalFed = 0;
        for(let i = 0; i < dataCount.length; i++) {
            totalFed += parseFloat(dataCount[i].feed_amount.split(' ')[0]);
            totalAte += parseFloat(dataCount[i].amount_ate) * parseFloat(dataCount[i].feed_amount.split(' ')[0]);
        }   
        console.log(`total ate = ${totalAte}`)
        console.log(`total fed = ${totalFed}`)
        console.log(`Amount ate total = ${totalAte / totalFed}`)

        const roundNumber = (num) => {
            return Math.round((num * 100) * 10) / 10; 
        }
        if(dataSet === 'totalAte') {
            return (
                <p>Ate {roundNumber(totalAte / totalFed)}%</p>
            )
        } else if(dataSet === 'totalFed') {
            return (
                <p>Ate {totalFed} Tbsp</p>
                )
        } 
    }

    const handleChange = (e) => {
        setDay(e)
    }


    return (
        <div>
            <TimeSelectMenu timeline={(day) => handleChange(day)}/>
            <div className="today-avg"> 
               {yesterdayEatAverage('totalAte')}
               {yesterdayEatAverage('totalFed')}
               {}
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
