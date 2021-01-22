import { useEffect, useState } from 'react';
import { getPetPooInfo  } from '../../Autho/Repository';
import Loading from '../../HelperComponents/Loading';
import PooDays from './PooDays'

function PooActivity( {petDetails} ) {
    const [pooData, setPooData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const helperFunction = () => {
        getPetPooInfo(petDetails.id)
            .then(res => setPooData(res))
            .catch(err => console.log(err))
    }

    const updatePosts = () => {
        helperFunction()
    }

    useEffect(() => {
        getPetPooInfo(petDetails.id)
            .then(res => setPooData(res))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [petDetails.id])
    
    if(isLoading === true) {
        return <Loading />
    }

    const displayPooData = () => {
        return (
            <div>
                <PooDays 
                    updatePosts={() => updatePosts()}
                    petDetails={petDetails}
                    pooData={pooData}/>
            </div>
        )
    }

    return (
        <div>
            {pooData ? displayPooData() : ''}
        </div>
    )
}

export default PooActivity;