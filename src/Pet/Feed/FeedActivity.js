import { useEffect, useState } from 'react';
import { getPetEatInfo  } from '../../Autho/Repository';
import FormatTime from '../../HelperComponents/FormatTime';

import FeedDays from './FeedDays';


function FeedActivity( {petDetails} ) {
    const [eatData, setEatData] = useState(null)

    useEffect(() => {
        const helperFunction = () => {
            getPetEatInfo(petDetails.id)
                .then(res => setEatData(res))
                .catch(err => console.log(err))
        }
        helperFunction()
    }, [petDetails])

    const displayEatData = () => {
        return <div>
                    <FeedDays 
                        eatData={eatData}/>
                </div>
    }

    return (
        <div>
            <h2>Eat Data</h2>
            {eatData ? displayEatData() : ''}
        </div>
    )
}

export default FeedActivity;