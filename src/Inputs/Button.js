import './Button.scss'

function Button(props) {

    return (
        <button
            onClick={props.onClick}
            className="button"
        >
            <p>{props.name}</p>
        </button>
    )
}

export default Button;