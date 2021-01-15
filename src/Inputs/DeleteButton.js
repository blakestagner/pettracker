import './Button.scss';
import DeleteIcon from '../img/icons/delete.svg';

function DeleteButton(props) {

    const handleClick = () => {
        props.click();
    }

    return (
        <button
            onClick={handleClick}
            className="delete-button"
            alt="delete">
            <img
                className="add-user-icon-img"
                alt="delete icon" 
                src={DeleteIcon} />
            <p>Delete</p>
        </button>
    )
}
export default DeleteButton;