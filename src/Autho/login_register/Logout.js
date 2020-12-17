import { useHistory } from 'react-router-dom';

function Logout(props) {

    let history = useHistory();

    const logout = () => {
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('x-access-token-expiration')
        props.logout()
        history.push('/');
    }
    return (
        <div className="logout">
            <button onClick={() => logout()}><p>logout</p></button>
        </div>
    )
}
export default Logout;