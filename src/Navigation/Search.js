import SearchBlack from '../img/icons/search_black.svg';
import {useEffect, useState} from 'react'
import CloseWhiteIcon from '../img/icons/close_white.svg';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '../img/icons/search_white.svg';
import { searchUsers, sendFriendReuest, getFriendsList, getUserRelationship } from '../Autho/Repository';
import Avatar from '../User/Avatar';
import AddFriendIcon from '../img/icons/add_friend.svg';
import IconButton from '../Inputs/IconButton';
import profileIcon from '../img/icons/person.svg';
import cancelRequestIcon from '../img/icons/remove_friend.svg';

function Search(props) {
    const [expanded, setExpanded] = useState(0);
    const [userRequests, setUserRequests] = useState()

    const Toggle = () => {
        if(expanded === 0) {
            setExpanded(1)
        } else setExpanded(0)
    }

    const GetUserRelationship = () => {
        getUserRelationship()
            .then(res => {
                setUserRequests(res)
            })
            .catch(err => console.log(err))
            .finally(() => console.log(userRequests))
    }

    useEffect(() => {
        GetUserRelationship()
    }, [])
    

    return (
        <div className="menu-icon">
                <img
                    onClick={() => Toggle()}
                    alt='search'
                    src={SearchBlack} />
                <SearchExpanded
                    userRequests={userRequests} 
                    userDetails={props.userDetails}
                    expanded={expanded} 
                    toggle={() => Toggle()}/>
        </div>
    )
}



export default Search;


function SearchExpanded(props) {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState(0);
    const [searchMessage, setSearchMessage] = useState('Search above...');

    const handleChange = (e) => {
        const {value} = e.target;
        setSearchTerm(value)
    }

    const useStyles = makeStyles((theme) => ({
        search: {
            '& .MuiInput-underline:before': {
                borderBotton: '1px solid #fff)'
            },
            '& .MuiInput-underline:after': {
                borderBotton: '1px solid #fff)'
            },
          },
        }));
    const classes = useStyles();

    const submitSearch = () => {
        searchUsers(searchTerm)
        .then(res => {
            setSearchResult(res)
            console.log(res)
        })
        .catch(err => console.log(err))
       
    }

    const SendFriendRequest = (friendId) => {
        sendFriendReuest(friendId)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }


    const CheckFriendship = (id) => {

        const NoRelationship = (id) => {
            return (
                <div className="add-user">
                    <p>send request</p>
                    <IconButton 
                        click={() => SendFriendRequest(id)}
                        icon={AddFriendIcon}/>
                </div>
            )
        }
        const SomeRelationship = (id) => {
            return (
                <div className="add-user">
                    <p>Cancel Request</p>
                    <IconButton 
                        click={() => console.log('still need to')}
                        icon={cancelRequestIcon}/>
                </div>
            )
        }
        const Friends = (id) => {
            return (
                <div className="add-user">
                    <p>Friends</p>
                </div>
            )
        }
        const userId = props.userDetails.id;


      

        let userID = '';
        
        if(props.userRequests.some( users => users.user_two === id && users.status === 1 )) {
            return Friends(id)
        } else if(props.userRequests.some( users => users.user_two === id && users.status === 0 )) {
            return SomeRelationship(id)
        } else return NoRelationship(id)

        

    }


    /*const test = () => {
        return (
            <div>
                <div className="add-user">
                    <p>send request</p>
                    <IconButton 
                        click={() => SendFriendRequest(id)}
                        icon={AddFriendIcon}/>
                </div>
                <div className="add-user">
                    <p>Request sent</p>
                    <IconButton 
                        click={() => SendFriendRequest(id)}
                        icon={profileIcon}/>
                </div>
                <div className="add-user">
                            <p>Friends</p>
                        </div>
            </div>
        )
    }*/

    return (
        <div className={props.expanded === 0?  'menu-colapsed' : 'menu-expanded'}>
            <div className="search-bar">
                <Input 
                    className={classes.search}
                    style={{color: '#fff', margin: '0 10px'}}
                    onChange={ handleChange }
                    placeholder="Search" 
                    inputProps={{ 'aria-label': 'Search' }} />
                <img
                    onClick={() => submitSearch()}
                    alt='search'
                    src={SearchIcon} />
               
                <div 
                    className="close-search"
                    onClick={props.toggle}>
                    <img 
                        alt="close search"
                        src={CloseWhiteIcon} />
                </div>
            </div>
            <div>
                <h3>results</h3>   
                {searchMessage}
                <br />
                {searchResult === 0  ? 'No results...' : 
                    <div>
                        {searchResult.map(obj => (
                            <div key={obj.id}
                                className="search-result-users">
                                <Avatar
                                    userDetails={obj}
                                    profileImgUrl = {obj.profile_pic}
                                    hasProfileImg={obj.profile_pic}
                                    type="human"
                                    />
                                <p>{obj.fname} {obj.lname}</p>
                                    {CheckFriendship(obj.id)}
                            </div>
                        ))}
                    </div>
                }
            </div>

        </div>
    )
}