import './Button.scss';

function YesNoButton(props) {

    const handleClick = () => {
        props.click();
    }

    return (
        <button
            onClick={handleClick}
            className={props.type === 'yes' ? 'yes-button' : 'no-button'}
            alt={props.title}>
            <p>{props.title}</p>
        </button>
    )
}
export default YesNoButton;