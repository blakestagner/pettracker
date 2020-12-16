import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import TimelineIcon from '@material-ui/icons/Timeline';
import SettingsIcon from '@material-ui/icons/Settings';


import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const useStyles = makeStyles({
    root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);'
    },
  });

function BottomNav(props) {
    const classes = useStyles();
    const { pathname } = useLocation();
    const [value, setValue] = useState(pathname);

    useEffect(() => {
        setValue(pathname)
      }, [pathname])


    const handleChange = (event, newValue) => {
        setValue(newValue);

    }

    return (
        <div>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => handleChange(event, newValue)}
                showLabels
                className={classes.root}
                >
                <BottomNavigationAction value="/home" label="Home" icon={<HomeIcon />} component={Link} to="/home"/>
                <BottomNavigationAction value="/timeline" label="Timeline" icon={<TimelineIcon />} component={Link} to="/timeline" />
                {/*<BottomNavigationAction value="/chat" label="Chat" icon={<MessageIcon />} component={Link} to="/chat" /> */ }
                <BottomNavigationAction value="/settings" label="Settings" icon={<SettingsIcon />} component={Link} to="/settings" />
            </BottomNavigation>
        </div>
    )
}
export default BottomNav;