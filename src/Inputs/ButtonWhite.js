import './Button.scss';

function ButtonWhite(props) {

    const handleClick = () => {
        props.click();
    }

    return (
        <button
            onClick={handleClick}
            className="button-white"
            alt={props.name}>
            <p>{props.name}</p>
        </button>
    )
}
export default ButtonWhite;