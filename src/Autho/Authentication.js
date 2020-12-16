import React, {useEffect} from 'react';
import { isAuthenticated } from './Repository';
import { withRouter } from "react-router-dom";

export function Authentication(props) {

    useEffect(() => {
        if( isAuthenticated() ) {
            props.loggedIn(true)
        } else {
            props.loggedIn(false)
        }
    }, [props])

    return <React.Fragment />
}
export default withRouter(Authentication)