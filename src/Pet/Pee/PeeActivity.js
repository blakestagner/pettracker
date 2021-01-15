import { useEffect, useState } from 'react';
import { getPetPeeInfo  } from '../../Autho/Repository';

import PeeDays from './PeeDays'

function PeeActivity( {petDetails} ) {
    const [peeData, setPeeData] = useState(null)

    const helperFunction = () => {
        getPetPeeInfo(petDetails.id)
            .then(res => setPeeData(res))
            .catch(err => console.log(err))
    }

    const updatePosts = () => {
        helperFunction()
    }
    
    useEffect(() => {
        helperFunction()
    }, [petDetails])

    const displayPeeData = () => {
        return <div>
                    <PeeDays 
                        updatePosts={() => updatePosts()} 
                        petDetails={petDetails}
                        peeData={peeData}/>
                </div>
    }

    return (
        <div>
            {peeData ? displayPeeData() : ''}
        </div>
    )
}

export default PeeActivity;