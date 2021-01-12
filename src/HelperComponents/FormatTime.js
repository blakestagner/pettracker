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
    return (
        <div className="formated-time">
            <p>{displayDate(props.time)}</p>
            <p>{displayTime(props.time)}</p>
        </div>
    )
}

export default FormatTime;