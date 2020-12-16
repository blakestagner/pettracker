import { Redirect } from 'react-router-dom';

function Logout(props) {

    const logout = () => {
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('x-access-token-expiration')
        props.logout()
    }
    return (
        <div className="logout">
            <button onClick={() => logout()}>logout</button>
        </div>
    )
}
export default Logout;