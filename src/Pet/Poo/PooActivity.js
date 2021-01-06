import { useEffect, useState } from 'react';
import { getPetPooInfo  } from '../../Autho/Repository';

import PooDays from './PooDays'

function PooActivity( {petDetails} ) {
    const [pooData, setPooData] = useState(null)

    useEffect(() => {
        const helperFunction = () => {
            getPetPooInfo(petDetails.id)
                .then(res => setPooData(res))
                .catch(err => console.log(err))
        }
        helperFunction()
    }, [petDetails])

    const displayPooData = () => {
        return <div>
                    <PooDays 
                        pooData={pooData}/>
                </div>
    }

    return (
        <div>
            <h2>Poo Data</h2>
            {pooData ? displayPooData() : ''}

        </div>
    )
}

export default PooActivity;