import { useHistory } from 'react-router-dom';
import {logOutTime } from '../Repository'

function Logout(props) {

    let history = useHistory();

    const logout = () => {
        logOutTime()
            .then(res => console.log(res))
            .catch(err => console.log(err))
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('x-access-token-expiration')
        props.logout()
        history.push('/');
    }
    return (
        <div className="logout">
            <button 
                className="button"
                onClick={() => logout()}><p>logout</p></button>
        </div>
    )
}
export default Logout;