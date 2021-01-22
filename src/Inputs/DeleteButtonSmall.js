import './Button.scss';
import DeleteIcon from '../img/icons/delete.svg';

function DeleteButtonSmall(props) {

    const handleClick = () => {
        props.click();
    }

    return (
        <button
            onClick={handleClick}
            className="delete-button-small"
            alt="delete">
            <img
                className="add-user-icon-img"
                alt="delete icon" 
                src={DeleteIcon} />
            <p>Delete</p>
        </button>
    )
}
export default DeleteButtonSmall;