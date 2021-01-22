import foodIcon from '../img/icons/food.svg';
import peeIcon from '../img/icons/pee.svg';
import poopIcon from '../img/icons/poop.svg';


function PetActivity({petDetails}) {





    return (
        <div className="user-posts">
            <h2>Pet Activity</h2>

                <div className="row-of-rows">
                    <img
                        className="img-icon" 
                        src={foodIcon} 
                        alt="Bday"/>
                    <h3 style={{textAlign: 'left'}}>Feed Schedule</h3>
                </div>
                <div className="row-of-rows">   
                    <img
                        className="img-icon" 
                        src={peeIcon} 
                        alt="pee"/>
                    <h3 style={{textAlign: 'left'}}>{petDetails.name}'s potty</h3>
                </div>
                <div className="row-of-rows">
                    <img
                        className="img-icon" 
                        src={poopIcon} 
                        alt="poop"/>
                    <h3 style={{textAlign: 'left'}}>{petDetails.name}'s poop</h3>
                </div>
                    
            
        </div>
    )
}
export default PetActivity;

