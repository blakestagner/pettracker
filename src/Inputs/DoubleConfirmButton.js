import './Button.scss';

function DoubleConfirmButton(props) {

    const handleClick = () => {
        props.click();
    }

    return (
        <button
            onClick={handleClick}
            className={props.type === 'yes' ? 'confirm-button' : 'cancel-button'}
            alt={props.title}>
            <p>{props.title}</p>
        </button>
    )
}
export default DoubleConfirmButton;