

function IconButton(props) {

    return (
            <button
                onClick={props.click} 
                className="add-user-icon">
                <img
                    className="add-user-icon-img"
                    alt="add user" 
                    src={props.icon} />
            </button>
    )
}
export default IconButton;