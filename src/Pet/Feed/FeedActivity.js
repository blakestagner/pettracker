import { useEffect, useState } from 'react';
import { getPetEatInfo  } from '../../Autho/Repository';
import Loading from '../../HelperComponents/Loading';
import FeedDays from './FeedDays'

function FeedActivity( {petDetails} ) {
    const [eatData, setEatData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const helperFunction = () => {
        getPetEatInfo(petDetails.id)
            .then(res => setEatData(res))
            .catch(err => console.log(err))
    }

    const updatePosts = () => {
        helperFunction()
    }
    
    useEffect(() => {
        getPetEatInfo(petDetails.id)
            .then(res => setEatData(res))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [petDetails.id])


    if(isLoading === true) {
        return <Loading />
    }

    const displayEatData = () => {
        return (
            <div>
                <FeedDays
                    updatePosts={() => updatePosts()} 
                    petDetails={petDetails}
                    eatData={eatData}/>
            </div>
        )
    }

    return (
        <div>
            {eatData ? displayEatData() : ''}
        </div>
    )
}

export default FeedActivity;