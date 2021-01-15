import './Button.scss'
import {useState} from 'react';


function ButtonRow(props) {
    const [clicked, setClicked] = useState(0)

    const handleClick = () => {
        setClicked(1);
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