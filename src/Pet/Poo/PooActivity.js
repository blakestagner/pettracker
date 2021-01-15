import { useEffect, useState } from 'react';
import { getPetPooInfo  } from '../../Autho/Repository';

import PooDays from './PooDays'

function PooActivity( {petDetails} ) {
    const [pooData, setPooData] = useState(null)

    const helperFunction = () => {
        getPetPooInfo(petDetails.id)
            .then(res => setPooData(res))
            .catch(err => console.log(err))
    }

    const updatePosts = () => {
        helperFunction()
    }

    useEffect(() => {
        helperFunction()
    }, [petDetails])
    
    const displayPooData = () => {
        return <div>
                    <PooDays 
                        updatePosts={() => updatePosts()}
                        petDetails={petDetails}
                        pooData={pooData}/>
                </div>
    }

    return (
        <div>
            {pooData ? displayPooData() : ''}
        </div>
    )
}

export default PooActivity;