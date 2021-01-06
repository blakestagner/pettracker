import { registerPet} from '../Autho/Repository';
import './pet.scss';
import {TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../Inputs/Button';
import { useHistory } from 'react-router-dom';


function RegisterPet(props) {
    const [petRegister, setPetRegister] = useState({
        name: '',
        type: '',
        feed_perday: '',
        feed_amount: '1', 
        feed_unit: 'cups',
        birthday: ''
    })

    let history = useHistory();

    const handleChange = (e) => {
        const {id, value} = e.target;
        setPetRegister(prevState => ({
            ...prevState,
            [id] : value
        }))
        console.log(petRegister)
    }
    const submitPetRegistration = () => {
        const regMsg = document.querySelector('#regMsg');

        const registrationSuccess = () => {
            regMsg.innerHTML = '';
            props.updateUserData()
            history.push('/home');
        }

        registerPet(petRegister)
        .then(res => {
            regMsg.innerHTML = res
            props.updateUserData()
            setTimeout(() => registrationSuccess(), 3000)
        })
        .catch(err => console.log(err))
    }
    const useStyles = makeStyles((theme) => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            marginTop: 25,
            marginLeft: 0,
            marginRight: theme.spacing(1),
            width: 200,
        },
        formControl: {
            maxWidth: 50,
            marginBottom: 20,
            marginTop: 25,
            marginRight: 25,
          },
          selectEmpty: {
            marginTop: theme.spacing(2),
          }
      }));
    const classes = useStyles();

    return (
        <div className='register-pet-box'>
            <h2>Register a Pet</h2>
            <div className="register-pet-box-inner">
                <TextField 
                    fullWidth={true}
                    required={true}
                    id="name" 
                    label="name"
                    name="name"
                    value={petRegister.name}
                    onChange={ handleChange }
                />
                <p className="input-label">Pet Type *</p>
                <RadioGroup row aria-label="Pet Type" name="type" defaultValue="top">
                    <FormControlLabel
                        value="Dog"
                        control={
                            <Radio 
                                id="type"
                                color='primary'
                                onClick={ handleChange } />}
                        label="Dog"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="Cat"
                        control={
                            <Radio 
                                id="type"
                                color='primary'
                                onClick={ handleChange } />}
                        label="Cat"
                        labelPlacement="start"
                    />
                </RadioGroup>
                <p className="input-label">Feed Per Day *</p>
                <RadioGroup row aria-label="Feed Per Day" name="feed_perday" defaultValue="top">
                    <FormControlLabel
                        value="1"
                        control={
                            <Radio 
                                id="feed_perday"
                                color='primary'
                                onClick={ handleChange } />}
                        label="1"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="2"
                        control={
                            <Radio 
                                id="feed_perday"
                                color='primary'
                                onClick={ handleChange } />}
                        label="2"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="3"
                        control={
                            <Radio 
                                id="feed_perday"
                                color='primary'
                                onClick={ handleChange } />}
                        label="3"
                        labelPlacement="start"
                    />
                    <FormControlLabel
                        value="4"
                        control={
                            <Radio 
                                id="feed_perday"
                                color='primary'
                                onClick={ handleChange } />}
                        label="4"
                        labelPlacement="start"
                    />
                </RadioGroup>
                <div className="form-row">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="feed_amount">Unit</InputLabel>
                            <Select
                            native
                            value={petRegister.feed_amount}
                            onChange={handleChange}
                            inputProps={{
                                name: 'Amount',
                                id: 'feed_amount',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value='0.25'>.25</option>
                            <option value='0.5'>.5</option>
                            <option value='0.75'>.75</option>
                            <option value='1'>1</option>
                            <option value='1.5'>1.5</option>
                            <option value='2'>2</option>
                            <option value='2.5'>2.5</option>
                            <option value='3'>3</option>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="feed_unit">Unit</InputLabel>
                            <Select
                            native
                            value={petRegister.feed_unit}
                            onChange={handleChange}
                            inputProps={{
                                name: 'Unit',
                                id: 'feed_unit',
                            }}
                            >
                            <option aria-label="None" value="" />
                            <option value='cups'>cups</option>
                            <option value='tbsp'>tbsp</option>
                        </Select>
                    </FormControl>
                </div>

                <TextField
                    id="birthday"
                    label="Birthday"
                    type="date"
                    defaultValue="2020-01-01"
                    className={classes.textField}
                    onChange={ handleChange }
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <Button
                onClick={() => submitPetRegistration()} 
                name='Register Pet'/>
                <p id="regMsg"></p>
            </div>
        </div>
    )
}
export default RegisterPet;