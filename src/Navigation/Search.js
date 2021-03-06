import SearchBlack from '../img/icons/search_black.svg';
import {useEffect, useState} from 'react'
import CloseWhiteIcon from '../img/icons/close_white.svg';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '../img/icons/search_white.svg';
import { searchUsers, sendFriendReuest, cancelFriendRequest, getUserRelationship } from '../Autho/Repository';
import Avatar from '../User/Avatar';
import ButtonIconSmall from '../Inputs/ButtonIconSmall';

function Search(props) {
    const [expanded, setExpanded] = useState(0);
    const [userRequests, setUserRequests] = useState(0)

    const Toggle = () => {
        if(expanded === 0) {
            setExpanded(1)
        } else {
            setExpanded(0);
        }
    }

    const GetUserRelationship = () => {
        getUserRelationship()
            .then(res => {
                setUserRequests(res)
            })
            .catch(err => console.log(err))
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
                    updateUserRelationship={() => GetUserRelationship()}
                    userRequests={userRequests} 
                    userDetails={props.userDetails}
                    expanded={expanded} 
                    toggle={() => Toggle()}/>
        </div>
    )
}

//Redesign the entire code base for search....

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

    useEffect(() => {
        const resetSearch = () => {
            setSearchTerm('');
            setSearchResult(0)
            setSearchMessage('Search above...')
            const searchInput = document.querySelector('#search-input')
            searchInput.value = ''
        }
        resetSearch()
    }, [props.expanded])

    

    const SendFriendRequest = (friendId) => {
        sendFriendReuest(friendId)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => props.updateUserRelationship())
    }

    const CancelFriendRequest = (friendId) => {
        cancelFriendRequest(friendId)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        .finally(() => props.updateUserRelationship())
    }


    const CheckFriendship = (id) => {
        const NoRelationship = (id) => {
            return (
                <div className="add-user">
                    <ButtonIconSmall 
                        name="add friend"
                        click={() => SendFriendRequest(id)}/>
                </div>
            )
        }
        const SomeRelationship = (id) => {
            return (
                <div className="add-user">
                    <ButtonIconSmall
                        name="cancel" 
                        click={() => CancelFriendRequest(id)}/>
                </div>
            )
        }
        const Friends = (id) => {
            return (
                <div className="add-user">
                    <ButtonIconSmall
                        name="friends" />
                </div>
            )
        }

        
        if(props.userRequests.some( users => users.user_two === id && users.status === 1 )) {
            return Friends(id)
        } else if(props.userRequests.some( users => users.user_two === id && users.status === 0 )) {
            return SomeRelationship(id)
        } else return NoRelationship(id)
    }


    const displaySearchResult = () => {
        return (
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
        )
    }


    const submitSearch = () => {
        searchUsers(searchTerm)
        .then(res => {
            setSearchMessage(`${res.length} results`)
            setSearchResult(res)
        })
        .catch(err => console.log(err))
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
                    id="search-input"
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
                {searchResult === 0  ? '' : 
                    displaySearchResult()
                }
            </div>

        </div>
    )
}