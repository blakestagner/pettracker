import { useEffect, useState } from 'react';
import { getPetPeeInfo  } from '../../Autho/Repository';

import PeeDays from './PeeDays'

function PeeActivity( {petDetails} ) {
    const [peeData, setPeeData] = useState(null)

    useEffect(() => {
        const helperFunction = () => {
            getPetPeeInfo(petDetails.id)
                .then(res => setPeeData(res))
                .catch(err => console.log(err))
        }
        helperFunction()
    }, [petDetails])

    const displayPeeData = () => {
        return <div>
                    <PeeDays 
                        peeData={peeData}/>
                </div>
    }

    return (
        <div>
            <h2>Pee Data</h2>
            {peeData ? displayPeeData() : ''}

        </div>
    )
}

export default PeeActivity;