import SearchBlack from '../img/icons/search_black.svg';
import {useEffect, useState} from 'react'
import CloseWhiteIcon from '../img/icons/close_white.svg';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '../img/icons/search_white.svg';
import { searchUsers, sendFriendReuest } from '../Autho/Repository';
import Avatar from '../User/Avatar';
import AddIcon from '../img/icons/add_white.svg';

function Search() {
    const [expanded, setExpanded] = useState(0)

    const Toggle = () => {
        if(expanded === 0) {
            setExpanded(1)
        } else setExpanded(0)
    }

    

    return (
        <div className="menu-icon">
                <img
                    onClick={() => Toggle()}
                    alt='search'
                    src={SearchBlack} />
            {expanded === 0 ? '' :
                <SearchExpanded 
                    toggle={() => Toggle()}/>
            }
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
        console.log(friendId)
        sendFriendReuest(friendId)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    useEffect(() => {

    }, [searchResult])


    return (
        <div className="menu-expanded">
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
                                <div className="add-user">
                                    <p>add user</p>

                                    <div
                                        onClick={() => SendFriendRequest(obj.id)} 
                                        className="add-user-icon">
                                        <img src={AddIcon} />
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                }
            </div>

        </div>
    )
}