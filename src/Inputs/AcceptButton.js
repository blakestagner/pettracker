import './Button.scss';
import AddIcon from '../img/icons/add_friend.svg';

function AcceptButton(props) {

    const handleClick = () => {
        props.click();
    }

    return (
        <button
            onClick={handleClick}
            className="accept-button"
            alt="delete">
            <img
                className="add-user-icon-img"
                alt="accept icon" 
                src={AddIcon} />
            <p>Accept</p>
        </button>
    )
}
export default AcceptButton;