import './Button.scss'

function ButtonRow(props) {

    return (
        <button
            onClick={props.onClick}
            value={props.value}
            id={props.id}
            className="button-row">
            <p 
                onClick={props.onClick}
                value={props.value}
                id={props.id}>
                {props.name}
            </p>
        </button>
    )
}

export default ButtonRow;