import { useEffect, useState } from 'react';
import { getPetPeeInfo  } from '../../Autho/Repository';
import Loading from '../../HelperComponents/Loading';
import PeeDays from './PeeDays'

function PeeActivity( {petDetails} ) {
    const [peeData, setPeeData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const helperFunction = () => {
        getPetPeeInfo(petDetails.id)
            .then(res => setPeeData(res))
            .catch(err => console.log(err))
    }

    const updatePosts = () => {
        helperFunction()
    }
    
    useEffect(() => {
        getPetPeeInfo(petDetails.id)
            .then(res => {
                setPeeData(res)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [petDetails.id])

    if(isLoading === true) {
        return <Loading />
    }

    const displayPeeData = () => {
        return (
            <div>
                <PeeDays 
                    updatePosts={() => updatePosts()} 
                    petDetails={petDetails}
                    peeData={peeData}/>
            </div>
        )
    }

    return (
        <div>
            {peeData ? displayPeeData() : ''}
        </div>
    )
}

export default PeeActivity;