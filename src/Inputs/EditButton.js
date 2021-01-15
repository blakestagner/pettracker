import './Button.scss';
import EditIcon from '../img/icons/edit.svg';

function EditButton(props) {

    return (
        <button
            onClick={props.click}
            className="edit-button"
            alt="edit">
            <img
                className="add-user-icon-img"
                alt="edit icon" 
                src={EditIcon} />
            <p>Edit</p>
        </button>
    )
}
export default EditButton;