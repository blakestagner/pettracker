import './Button.scss';

function ButtonIcon(props) {

    return (
        <button
            onClick={props.onClick}
            className="button"
        >
            <img 
                className="button-icon" 
                src={props.icon}
                alt="icon" />
            <p>{props.name}</p>
        </button>
    )
}

export default ButtonIcon;