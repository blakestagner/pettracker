import './Button.scss'

function Button(props) {

    return (
        <button
            onClick={props.onClick}
            className="button"
        >
            {props.name}
        </button>
    )
}

export default Button;