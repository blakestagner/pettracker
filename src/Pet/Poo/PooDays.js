import { useState } from 'react';
import FormatTime from '../../HelperComponents/FormatTime';
import { TodaysDate, TwoDaysAgo,  SevenDaysAgo, ThirtyDaysAgo } from '../../HelperComponents/TodaysDate';
import '../pet.scss';
import TimeSelectMenu from '../TimeSelectMenu';
import CloseIcon from '../../img/icons/close_red.svg';
import CheckedIcon from '../../img/icons/checked_noborder.svg';
import ArrowDownIcon from '../../img/icons/arrow_down_grey.svg';
import ArrowUpIcon from '../../img/icons/arrow_up_grey.svg';
import {deletePooActivity} from '../../Autho/Repository';
import EditButton from '../../Inputs/EditButton';
import DeleteButton from '../../Inputs/DeleteButton';


import FoodIcon from '../../img/icons/food.svg';
import DateIcon from '../../img/icons/date.svg';
import DateRangeIcon from '../../img/icons/date-range.svg';
import ArrowRightIcon from '../../img/icons/arrow-right.svg';
import AmountIcon from '../../img/icons/amount.svg'
import PetsIcon from '../../img/icons/pets.svg';


function PooDays(props) {
    const [day, setDay] = useState(0);
    const [expanded, setExpanded] = useState(0);

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

    const wordDate = (date) => {
        const getMonthName = (e) => {
            switch(e) {
                case '01':
                    return 'Jan';
                case '02':
                    return 'Feb';
                case '03':
                    return 'Mar';
                case '04':
                    return 'Apr';
                case '05':
                    return 'May';
                case '06':
                    return 'Jun';
                case '07':
                    return 'Jul';
                case '08':
                    return 'Aug';
                case '09':
                    return 'Sept';
                case '10':
                    return 'Oct';
                case '11':
                    return 'Nov';
                case '12':
                    return 'Dec';
                default:  
                    return 'Null';
            }
        }
        const day = date.split('-')[2]
        const month = getMonthName(date.split('-')[1])
        const year = date.split('-')[0]


        return (
            <h2>{month} {day} <span>{year}</span></h2>
        )
    }

    const yesterdayMissedAverage = () => {
        let dataCount = filterTime(props.pooData);
        let pooData = 0;
        let runny = 0;
        let solid = 0;

        for(let i = 0; i < dataCount.length; i++) {
            pooData += parseInt(dataCount[i].missed)
            parseInt(dataCount[i].consistency) === 1 ? 
                solid += parseInt(dataCount[i].consistency) : runny ++
        }   
        let pooDataAvg = Math.round((pooData / dataCount.length) * 10000) / 100;

        const roundNumber = (number) => Math.round((number) * 1000) / 10;

        let dateRange = () => {
            switch(day) {
                case 0:
                    return (
                        <div
                            className="header">
                            {wordDate(TodaysDate())} 
                        </div>
                    )
                case 1:
                    return (
                        <div
                            className="header">
                            {wordDate(TwoDaysAgo())} 
                        </div>
                    )
                case 2:
                    return (
                        <div
                            className="header">
                            {wordDate(TodaysDate())} 
                            <img 
                                className="through-icon" 
                                src={ArrowRightIcon} 
                                alt="through"/>
                            {wordDate(SevenDaysAgo())}
                        </div>
                    )
                case 3: 
                    return (
                        <div
                            className="header">
                            {wordDate(TodaysDate())} 
                            <span className="through">-</span> 
                            {wordDate(ThirtyDaysAgo())}
                        </div>
                    ) 
                default:
            }
        }

        return (
            <div> 
                <div className="date-header">
                    <img 
                        className="date-header-icon"
                        src={ day === 0 || day === 1 ? DateIcon : DateRangeIcon } 
                        alt="date icon"/>
                    {dateRange()}
                </div>
                <div className="quarter-card-container">
                    <div className="quarter-card">
                        <img className="food-icon" src={FoodIcon} />
                        {isNaN(pooDataAvg)  ? <p>no data...</p> : 
                    <p>Success{pooDataAvg}%</p> }
                    </div>
                    <div className="quarter-card">
                        <img className="food-icon" src={AmountIcon} />
                        <p>Total Poo {dataCount.length}x</p>
                    </div>
                </div>
                <div className="quarter-card-container">
                    <div className="quarter-card">
                        <img className="food-icon" src={FoodIcon} />
                        <p>Runny {roundNumber((runny / dataCount.length))}%</p>
                    </div>
                    <div className="quarter-card">
                        <img className="food-icon" src={AmountIcon} />
                        <p>Solid {roundNumber((solid / dataCount.length))}%</p>
                    </div>
                </div>
            </div>
        )
    }

    const deletePost = (postId, petId) => {
        console.log(postId, petId)
        const activityPost = document.querySelector(`#poo-${postId}`)

        const deleteSpan = document.createElement("span");
        deleteSpan.className = 'delete-message'
        const deleteMessgae = document.createTextNode("Activity Deleted")
        deleteSpan.appendChild(deleteMessgae);

        const removeAllChildNodes = (parent) => {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
            parent.appendChild(deleteSpan)
            setTimeout(() => {
                props.updatePosts()
            }, 1000)
        }



        deletePooActivity(postId, petId)
            .then(res => {
                removeAllChildNodes(activityPost)
            })
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setDay(e);
        
    }

    const activityDetailsExpand = (id) => {
        if(expanded !== id) {
            setExpanded(id)
        } else if (expanded === id) {
            setExpanded(0)
        }
    }

    const percentColor = (percent) => {
        if( percent >= 0 && percent <= 10) {
            return `#B22222`
        } else if (percent >= 11 && percent <= 20   ) {
            return `d00000`
        } else if (percent >= 21 && percent <= 30  ) {
            return `#dc2f02`
        } else if (percent >= 31 && percent <= 40  ) {
            return `#e85d04`
        }else if (percent >= 41 && percent <= 50 ) {
            return `#f48c06`
        }else if (percent >= 51 && percent <= 60 ) {
            return `faa307`
        }else if (percent >= 61 && percent <= 70 ) {
            return `#80b918`
        }else if (percent >= 71 && percent <= 80 ) {
            return `#2b9348`
        }else if (percent >= 81 && percent <= 90 ) {
            return `#147604`
        }else if (percent >= 91 && percent <= 100 ) {
            return `green`
        }

    }


    return (
        <div>
            <TimeSelectMenu timeline={(day) => handleChange(day)}/>
                {yesterdayMissedAverage()}
                {filterTime(props.pooData).map(obj => (
                <div
                    id={`poo-${obj.id}`} 
                    key={obj.id}
                    className='activity-log-card'> 
                    <div className="activity-log-header">
                        <div >
                            <img src={PetsIcon} />{props.petDetails.name}
                        </div>
                    </div>
                    <div className="activity-log-card-main">
                        <FormatTime
                            type="small"
                            format={day === 0 || day === 1 ? 'time-small' : 'small'}
                            time={obj.time_select}/>
                    </div>
                    <div className="activity-log-card-main">
                        <div className="percentage">
                                <p>
                                    {obj.amount_ate === '1' ? 'Finished food' : 
                                    `Made it ${obj.missed *100}%`}
                                </p>
                            <div 
                                className="percentage-inner"
                                style={{
                                    width: `${obj.missed *100}%`, 
                                    backgroundColor: `${percentColor(obj.missed *100)}`
                                    }}>
                            </div> 
                        </div>   
                    </div>
                    <div className="activity-log-details">
                        <div 
                            className={expanded === obj.id ? 
                                "activity-log-details-expanded" :
                                "activity-log-details-inner "}>
                            <DeleteButton click={() => deletePost(obj.id, props.petDetails.id)}/>
                            <EditButton click={() => console.log('edit') } />
                        </div>
                        <img 
                            src={expanded === obj.id ? ArrowUpIcon : ArrowDownIcon } 
                            alt="expand"
                            onClick={() => activityDetailsExpand(obj.id)}/>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default PooDays;
