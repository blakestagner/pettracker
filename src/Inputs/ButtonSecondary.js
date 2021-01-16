import './Button.scss';

function ButtonSecondary(props) {

    const handleClick = () => {
        props.click();
    }

    return (
        <button
            onClick={handleClick}
            className="button-secondary"
            alt="delete">
            <img
                className="add-user-icon-img"
                alt="remove" 
                src={props.icon} />
            <p>remove</p>
        </button>
    )
}
export default ButtonSecondary;