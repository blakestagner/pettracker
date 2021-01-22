

function IconButton(props) {

    return (
            <button
                onClick={props.click} 
                className="add-user-icon">
                <img
                    className="icon"
                    alt="add user" 
                    src={props.icon} />
            </button>
    )
}
export default IconButton;