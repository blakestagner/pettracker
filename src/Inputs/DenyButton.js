import './Button.scss';
import DeleteIcon from '../img/icons/delete.svg';

function DenyButton(props) {

    const handleClick = () => {
        props.click();
    }

    return (
        <button
            onClick={handleClick}
            className="deny-button"
            alt="delete">
            <img
                className="add-user-icon-img"
                alt="deny icon" 
                src={DeleteIcon} />
            <p>Deny</p>
        </button>
    )
}
export default DenyButton;