import './Button.scss';

function ButtonIconOnly(props) {

    return (
        <button
            onClick={props.onClick}
            className={props.class === 'true' ? 'button-row active' : 'button-row '}
            id={props.id}
            name={props.name}
            value={props.value}
        >
            <img 
                className="button-icon" 
                src={props.icon}
                alt="icon"
                id={props.id}
                name={props.name} 
                value={props.value}/>
            <p
                id={props.id}
                name={props.name}
                value={props.value}>
                {props.name}
            </p>
        </button>
    )
}

export default ButtonIconOnly;