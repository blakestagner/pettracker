import './Button.scss'

function ButtonFullWidth(props) {

    return (
        <button
            onClick={props.click}
            className="button-full-width"
        >
            <p>{props.name}</p>
        </button>
    )
}

export default ButtonFullWidth;