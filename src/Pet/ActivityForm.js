import {TextField } from '@material-ui/core';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import ButtonRow from '../Inputs/ButtonRow';
import {logFoodActivity, logPeeActivity, logPooActivity} from '../Autho/Repository';
import ButtonIconOnly from '../Inputs/ButtonIconOnly';
import unchecked from '../img/icons/unchecked.svg';
import checked from '../img/icons/checked.svg';

function ActivityForm(props) {

    const currentTime = () => {
        var currentTime = new Date();
        var year = currentTime.getFullYear();
        var month = currentTime.getMonth() + 1;
        var day = currentTime.getDate();
        var hours = currentTime.getHours();
        var mins = currentTime.getMinutes();
        return `${year}-${
                month < 10 ? `0${month}`: month}-${
                day < 10 ? `0${day}` : day}T${
                hours < 10 ? `0${hours}` : hours}:${
                mins < 10 ? `0${mins}` : mins}:00`;
    }
    const displayTime = (time) => {
        
        var timeHelper = time.split('T')[1].split(':');
        var date = time.split('-');
        const timeNow = () => {
            var amPM = timeHelper[0] > 11 ? 'PM' : 'AM';
            var twelveHourClock = timeHelper[0] > 12 ? timeHelper[0] - 12 : timeHelper[0]
            return `${twelveHourClock}:${timeHelper[1]} ${amPM}`
        }
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
        return `${getMonthName(date[1])} ${date[2].split('T')[0]} ${date[0]} ${timeNow()}`
    }

    const selectedForm = () => {
        switch(props.activitySelected) {
            case 'Post':
                return <PostActivity 
                            petDetails={props.petDetails}
                            userDetails={props.userDetails}
                            time={currentTime()}
                            displayTime={displayTime(currentTime())}/>;
            case 'Eat':
                return <EatActivity 
                            close={props.close}
                            petDetails={props.petDetails}
                            userDetails={props.userDetails}
                            time={currentTime()}
                            displayTime={displayTime(currentTime())}/>;
            case 'Pee':
                return <PeeActivity 
                            close={props.close}
                            petDetails={props.petDetails}
                            userDetails={props.userDetails}
                            time={currentTime()}
                            displayTime={displayTime(currentTime())}/>;
            case 'Poop':
                return <PoopActivity 
                            close={props.close}
                            petDetails={props.petDetails}
                            userDetails={props.userDetails}
                            time={currentTime()}
                            displayTime={displayTime(currentTime())}/>;
            case 'Walk':
                return <WalkActivity 
                            close={props.close}
                            petDetails={props.petDetails}
                            userDetails={props.userDetails}
                            time={currentTime()}
                            displayTime={displayTime(currentTime())}/>
            default: 
                return <p>{props.activitySelected}</p>
        }
    }

    return (
        <div>
            {selectedForm()}
        </div>
    )
    
}
export default ActivityForm

/*Walk Activity*/
function PostActivity(props) {

    return (
        <div>
            <h1>post</h1>
        </div>
    )
}


function EatActivity(props) {
    const [petEat, setPetEat ] = useState({
        id: props.petDetails.id,
        feed_time: props.time,
        feed_amount: '3 tbsp',
        amount_ate: ''
    })
    const [eatNow, setEatNow] = useState(1);
    const [updated, setUpdate ] = useState(0);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setPetEat(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const submitEat = () => {
        const updateMsg = document.querySelector('#eat-submit-msg')
        updateMsg.innerHTML = 'Submitting'
        setUpdate(1)
        logFoodActivity(petEat)
            .then(res => {
                updateMsg.innerHTML = 'Success'
                setUpdate(0)
                setTimeout(() => {
                    updateMsg.innerHTML = 'Log Now'
                    props.close()
                    }, 1000)
            })
            .catch(err => console.log(err))
    }
    const amountAte = () => {
        return <div>
                    <p className="form-input-label">Amount Ate *</p>
                    <RadioGroup row aria-label="Amount Ate" name="amount_ate" defaultValue="top">
                        <FormControlLabel
                            value="0"
                            control={
                                <Radio 
                                    id="amount_ate"
                                    color='primary'
                                    onClick={ handleChange } />}
                            label="None"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="0.25"
                            control={
                                <Radio 
                                    id="amount_ate"
                                    color='primary'
                                    onClick={ handleChange } />}
                            label="1/4"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="0.5"
                            control={
                                <Radio 
                                    id="amount_ate"
                                    color='primary'
                                    onClick={ handleChange } />}
                            label="Half"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="0.75"
                            control={
                                <Radio 
                                    id="amount_ate"
                                    color='primary'
                                    onClick={ handleChange } />}
                            label="3/4"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value="1"
                            control={
                                <Radio 
                                    id="amount_ate"
                                    color='primary'
                                    onClick={ handleChange } />}
                            label="All"
                            labelPlacement="top"
                        />
                    </RadioGroup>
                </div>
    }

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1) + 8,
          marginRight: theme.spacing(1),
          width: 220,
          display: 'block'
        },
      }));
    const classes = useStyles();

    return (
        <div className='activity-log-form-inner'>
            <div className="current-select">
                <p>Log Current Time?</p>
                <p>{props.displayTime}</p>
                <ButtonRow
                    class={eatNow === 0 ? 1 : 0}
                    name="Yes"
                    onClick={() => setEatNow(1)}/>
                <ButtonRow 
                    class={eatNow === 1 ? 1 : 0}
                    name="No"
                    onClick={() => setEatNow(0)}/>
            </div>
            {eatNow ? 
            (
                ''
            )
            :
            (
                <div>
                    <TextField
                        id="feed_time"
                        label="Feed Time"
                        type="datetime-local"
                        defaultValue={props.time}
                        className={classes.textField}
                        onChange={ handleChange }
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
            )}
            {amountAte()}
            <button
                className="submit-activity-button"
                id="eat-submit"
                name="Log Now"
                onClick={() => submitEat()}>
                <p id="eat-submit-msg">Log Now</p>
                {updated ? (<LoadingAnimation />) : ''}
            </button>
        </div>
    )
}
/*Pee Activity*/
function PeeActivity(props) {
    const [petPee, setPetPee ] = useState({
        id: props.petDetails.id,
        pee_time: props.time,
        missed: '1',
    })
    const [peeNow, setPeeNow] = useState(1);
    const [updated, setUpdate ] = useState(0);

    const handleChange = (e) => {
        const {id, value} = e.currentTarget;
        setPetPee(prevState => ({
            ...prevState,
            [id] : value
        }))
        console.log(petPee)
    }

    const submitPee = () => {
        const updateMsg = document.querySelector('#pee-submit-msg')
        updateMsg.innerHTML = 'Submitting'
        setUpdate(1)
        logPeeActivity(petPee)
            .then(res => {
                updateMsg.innerHTML = 'Success'
                setUpdate(0)
                setTimeout(() => {
                    updateMsg.innerHTML = 'Log Now'
                    props.close()
                    }, 1000)
            })
            .catch(err => console.log(err))
    }

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1) + 8,
          marginRight: theme.spacing(1),
          width: 220,
          display: 'block'
        },
      }));

    const classes = useStyles();
    
    return (
        <div className='activity-log-form-inner'>
            <div className="current-select">
                <p>Log Current Time?</p>
                <p>{props.displayTime}</p>
                <ButtonRow
                    class={peeNow === 0 ? 1 : 0}
                    name="Yes"
                    onClick={() => setPeeNow(1)}/>
                <ButtonRow 
                    class={peeNow === 1 ? 1 : 0}
                    name="No"
                    onClick={() => setPeeNow(0)}/>
            </div>
            {peeNow ? 
            (
                ''
            )
            :
            (
                <div>
                    <TextField
                        id="pee_time"
                        label="Pee Time"
                        type="datetime-local"
                        defaultValue={props.time}
                        className={classes.textField}
                        onChange={ handleChange }
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </div>
            )}
            <div className="pee-spot">
                <p>Did {props.petDetails.name} Potty in the right spot?</p>
                <ButtonIconOnly 
                    id='missed'
                    onClick={ handleChange }
                    icon={petPee.missed === '1' ? checked : unchecked}
                    class={petPee.missed === '1' ? 'true' : 'false'}
                    value='1'
                    name='Yes' />
                <ButtonIconOnly 
                    id="missed"
                    onClick={ handleChange }
                    value='0'
                    icon={petPee.missed === '0' ? checked : unchecked}
                    class={petPee.missed === '0' ? 'true' : 'false'}
                    name='Miss' 
                    />
            </div>
            <button
                className="submit-activity-button"
                id="poo-submit"
                name="Log Now"
                onClick={() => submitPee()}>
                <p id="pee-submit-msg">Log Now</p>
                {updated ? (<LoadingAnimation />) : ''}
            </button>
        </div>
    )
}
/*Poop Activity*/
function PoopActivity(props) {

    const [petPoo, setPetPoo ] = useState({
        id: props.petDetails.id,
        poo_time: props.time,
        missed: '1',
        consistency: '1'
    })
    const [pooNow, setPooNow] = useState(1);
    const [updated, setUpdate ] = useState(0);

    const handleChange = (e) => {
        const {id, value} = e.currentTarget;
        setPetPoo(prevState => ({
            ...prevState,
            [id] : value
        }))
        console.log(petPoo)
    }
    const submitPoo = () => {
        const updateMsg = document.querySelector('#poo-submit-msg')
        updateMsg.innerHTML = 'Submitting'
        setUpdate(1)
        logPooActivity(petPoo)
            .then(res => {
                updateMsg.innerHTML = 'Success'
                setUpdate(0)
                setTimeout(() => {
                    updateMsg.innerHTML = 'Log Now'
                    props.close()
                    }, 1000)
            })
            .catch(err => console.log(err))
    }

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1) + 8,
          marginRight: theme.spacing(1),
          width: 220,
          display: 'block'
        },
      }));

    const classes = useStyles();

    return (
        <div className='activity-log-form-inner'>
        <div className="current-select">
            <p>Log Current Time?</p>
            <p>{props.displayTime}</p>
            <ButtonRow
                class={pooNow === 0 ? 1 : 0}
                name="Yes"
                onClick={() => setPooNow(1)}/>
            <ButtonRow 
                class={pooNow === 1 ? 1 : 0}
                name="No"
                onClick={() => setPooNow(0)}/>
        </div>
        {pooNow ? 
        (
            ''
        )
        :
        (
            <div>
                <TextField
                    id="poo_time"
                    label="Poo Time"
                    type="datetime-local"
                    defaultValue={props.time}
                    className={classes.textField}
                    onChange={ handleChange }
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </div>
        )}
        <div className="pee-spot">
            <p>Did {props.petDetails.name} Poop in the right spot?</p>
            <ButtonIconOnly 
                id="missed"
                onClick={ handleChange }
                icon={petPoo.missed === '1' ? checked : unchecked}
                class={petPoo.missed === '1' ? 'true' : 'false'}
                value='1'
                name='Yes' />
            <ButtonIconOnly 
                id="missed"
                onClick={ handleChange }
                value='0'
                icon={petPoo.missed === '0' ? checked : unchecked}
                class={petPoo.missed === '0' ? 'true' : 'false'}
                name='Miss' 
                />
        </div>
        <div className="pee-spot">
            <p>Consistency</p>
            <ButtonIconOnly 
                id="consistency"
                onClick={ handleChange }
                icon={petPoo.consistency === '1' ? checked : unchecked}
                class={petPoo.consistency === '1' ? 'true' : 'false'}
                value='1'
                name='Normal' />
            <ButtonIconOnly 
                id="consistency"
                onClick={ handleChange }
                value='0'
                icon={petPoo.consistency === '0' ? checked : unchecked}
                class={petPoo.consistency === '0' ? 'true' : 'false'}
                name='Runny' 
                />
        </div>
        
        <button
            className="submit-activity-button"
            id="poo-submit"
            name="Log Now"
            onClick={() => submitPoo()}>
            <p id="poo-submit-msg">Log Now</p>
            {updated ? (<LoadingAnimation />) : ''}
        </button>
    </div>
    )
}
/*Walk Activity*/
function WalkActivity(props) {

    const [petWalk, setPetWalk ] = useState()

    const [walkNow, setWalkNow] = useState(1);

    const handleChange = (e) => {
        const {id, value} = e.target;
        setPetWalk(prevState => ({
            ...prevState,
            [id] : value
        }))
        console.log(petWalk)
    }
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1) + 8,
          marginRight: theme.spacing(1),
          width: 220,
          display: 'block'
        },
      }));

    const classes = useStyles();

    return (
        <div>
            <p>Walk activity Coming Soon</p>
        </div>
    )
}

const LoadingAnimation = () => {

    return (
      <div className="loader">
        <div className="duo duo1">
          <div className="dot dot-a"></div>
          <div className="dot dot-b"></div>
        </div>
        <div className="duo duo2">
          <div className="dot dot-a"></div>
          <div className="dot dot-b"></div>
        </div>
      </div>
    )
  }