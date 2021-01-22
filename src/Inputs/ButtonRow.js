import './Button.scss'

function ButtonRow(props) {

    const handleClick = () => {
        props.onClick();
    }

    return (
        <button
            onClick={handleClick}
            value={props.value}
            id={props.id}
            className={props.class  ? 'button-row' : 'button-row active'}>
            <p 
                value={props.value}
                id={props.id}>
                {props.name}
            </p>
        </button>
    )
}

export default ButtonRow;