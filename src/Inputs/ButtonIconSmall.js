import './Button.scss';

function ButtonIconSmall(props) {

    return (
        <button
            onClick={props.click}
            className="button-icon-small"
        >
            <p>{props.name}</p>
        </button>
    )
}

export default ButtonIconSmall;