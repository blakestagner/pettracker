import { useState} from 'react';
import FormatTime from '../../HelperComponents/FormatTime';
import { TodaysDate, TwoDaysAgo,  SevenDaysAgo, ThirtyDaysAgo } from '../../HelperComponents/TodaysDate';
import '../pet.scss';
import TimeSelectMenu from '../TimeSelectMenu';
import CloseIcon from '../../img/icons/close_white.svg';
import CheckedIcon from '../../img/icons/checked_noborder.svg';
import ArrowDownIcon from '../../img/icons/arrow_down_grey.svg';
import ArrowUpIcon from '../../img/icons/arrow_up_grey.svg';

import { deleteFeedActivity } from '../../Autho/Repository';

import EditButton from '../../Inputs/EditButton';
import DeleteButton from '../../Inputs/DeleteButton';

function FeedDays(props) {
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
            <div className="date-grid-box">
                <h3>{month}-{day}</h3>
                <p>{year}</p>
            </div>
        )
    }

    const yesterdayEatAverage = (dataSet) => {
        let dataCount = filterTime(props.eatData);
        let totalAte = 0;
        let totalFed = 0;
        for(let i = 0; i < dataCount.length; i++) {
            totalFed += parseFloat(dataCount[i].feed_amount.split(' ')[0]);
            totalAte += parseFloat(dataCount[i].amount_ate) * parseFloat(dataCount[i].feed_amount.split(' ')[0]);
        }

        const roundNumber = (num) => {
            return Math.round((num * 100) * 10) / 10; 
        }


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
                            <span className="through">-</span> 
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
            <div className="today-avg"> 
                {dateRange()}
                {isNaN(roundNumber(totalAte / totalFed))  ? 'no data...' : 
                    <p>Ate {roundNumber(totalAte / totalFed)}%</p>
                }
            </div>
        )
    }

    const deletePost = (postId, petId) => {
        const activityPost = document.querySelector(`#feed-${postId}`)

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



        deleteFeedActivity(postId, petId)
            .then(res => {
                removeAllChildNodes(activityPost)
            })
            .catch(err => console.log(err))
    }

    const handleChange = (e) => {
        setDay(e)
    }

    
    const activityDetailsExpand = (id) => {
        if(expanded !== id) {
            setExpanded(id)
        } else if (expanded === id) {
            setExpanded(0)
        }
    }


    return (
        <div>
            <TimeSelectMenu timeline={(day) => handleChange(day)}/>

               {yesterdayEatAverage()}


             {filterTime(props.eatData).map(obj => (


                <div
                    id={`feed-${obj.id}`} 
                    key={obj.id}
                    className='activity-log-card'>
                    <div className="activity-log-card-main">
                        <FormatTime
                            format={day === 0 || day === 1 ? 'time' : ''}
                            time={obj.time_select}/>
                        <div className="details">
                            {obj.amount_ate === '1' ? 'Finished food' : 'no'}
                            <div 
                                className={obj.amount_ate === '1' ? 
                                    'activity-log-icon-box hit-the-spot' :
                                    'activity-log-icon-box missed-the-spot'}>
                                <img 
                                    alt="icon"
                                    className="activity-log-icon"
                                    src={obj.amount_ate === '1' ? CheckedIcon : CloseIcon} />
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
export default FeedDays;
