import './Button.scss'

function ButtonRow(props) {

    return (
        <button
            onClick={props.onClick}
            className="button-row"
        >
            <p>{props.name}</p>
        </button>
    )
}

export default ButtonRow;