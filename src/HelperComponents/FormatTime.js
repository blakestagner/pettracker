import './helper.scss';
import ClockIcon from '../img/icons/time_color_primary.svg';

function FormatTime(props) {    
    const displayTime = (time) => {
        
        var timeHelper = time.split('T')[1].split(':');
        const timeNow = () => {
            var amPM = timeHelper[0] > 11 ? 'PM' : 'AM';
            var twelveHourClock = timeHelper[0] > 12 ? timeHelper[0] - 12 : timeHelper[0]
            return `${twelveHourClock}:${timeHelper[1]} ${amPM}`
        }
        return (
            `${timeNow()}`
        )
    }

    const displayDate = (time) => {
        var date = time.split('-');
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
        return (
            `${getMonthName(date[1])} ${date[2].split('T')[0]} ${date[0]}`
        )
    }

    if(props.format === 'time') {
        return (
            <div className="format-time-box">
                <img src={ClockIcon} alt="time" />
                <div className="formated-time"  id={props.format}>
                    <p>{displayTime(props.time)}</p>
                </div>
            </div>
        )
    } else if(props.format === 'time-small') {
        return (
            <div className="format-time-box-small">
                <img src={ClockIcon} alt="time" /> 
                <div className="formated-time-small"  id={props.format}>
                <p>{displayTime(props.time)}</p>
                </div>
            </div>
        )
    } else if(props.format === 'date') {
        return (
            <div className="format-time-box">
                <img src={ClockIcon} alt="time" /> 
                <div className="formated-time"  id={props.format}>
                    <p>{displayDate(props.time)}</p>
                </div>
            </div>
        )
    } else if(props.format === 'date-small') {
        return (
            <div className="format-time-box-small">
                <img src={ClockIcon} alt="time" /> 
                <div className="formated-time-small"  id={props.format}>
                    <p>{displayDate(props.time)}</p>
                </div>
            </div>
        )
    } else if(props.format === 'small') {
        return (
            <div className="format-time-box-small">
                <img src={ClockIcon} alt="time" /> 
                <div className="formated-time-small"  id={props.format}>
                    <p>{displayDate(props.time)}</p>
                    <p>{displayTime(props.time)}</p>
                </div>
            </div>
        )
    }else {
        return (
            <div className="format-time-box">
                <img src={ClockIcon} alt="time" />
                <div className="formated-time" id={props.format}>
                    <p>{displayDate(props.time)}</p>
                    <p>{displayTime(props.time)}</p>
                    {props.format}
                </div>
            </div>
        )
    }
}

export default FormatTime;