import { registerPet } from '../Autho/Repository';
import './pet.scss';
import {TextField } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../Inputs/Button';

function RegisterPet(props) {
    const [petRegister, setPetRegister] = useState({
        name: '',
        type: '',
        feed_perday: '',
        owner_id: props.userId,
        birthday: ''
    })

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
        registerPet(petRegister)
        .then(res => {
            regMsg.innerHTML = res
            setTimeout(() => regMsg.innerHTML = '', 3000)
        })
        .catch(err => console.log(err))
    }
    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
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
                    <FormControlLabel
                        value="5"
                        control={
                            <Radio 
                                id="feed_perday"
                                color='primary'
                                onClick={ handleChange } />}
                        label="5"
                        labelPlacement="start"
                    />
                </RadioGroup>
                <TextField
                    id="birthday"
                    label="Birthday"
                    type="date"
                    defaultValue="2017-05-24"
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