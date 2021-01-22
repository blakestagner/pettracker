import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import TimelineIcon from '@material-ui/icons/Timeline';
import AddIcon from '@material-ui/icons/Add';
import PetsIcon from '@material-ui/icons/Pets';
import ActivityLog from '../Pet/ActivityLog';
import { useRef } from "react";

import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
    root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    borderRadius: '25px'
    },
  });

function BottomNav(props) {
    const classes = useStyles();
    const { pathname } = useLocation();
    const [value, setValue] = useState(pathname);

    const toggleActivityLogRef = useRef();
    

    useEffect(() => {
        setValue(pathname)
      }, [pathname])


    const handleChange = (event, newValue) => {
        if(newValue === 3) {
            return toggleActivityLogRef.current.toggle()
        } else setValue(newValue);
    }

    return (
        <div>
            {props.petDetails === '0' ?
            '' : <ActivityLog 
                    ref={toggleActivityLogRef}
                    userDetails={props.userDetails}
                    petDetails={props.petDetails}/>}
            
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => handleChange(event, newValue)}
                showLabels
                className={classes.root}
                >
                <BottomNavigationAction value="/home" label="Home" icon={<HomeIcon />} component={Link} to="/home"/>
                <BottomNavigationAction value="/timeline" label="Timeline" icon={<TimelineIcon />} component={Link} to="/timeline" />
                <BottomNavigationAction value="/pet-profile" label="Pet" icon={<PetsIcon />} component={Link} to="/pet-profile" />
                {props.userDetails.pet_id !== 0 ? 
                    <BottomNavigationAction label="Log" icon={<AddIcon />} /> 
                    : 
                    ''}
            </BottomNavigation>
        </div>
    )
}
export default BottomNav;