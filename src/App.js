import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import { isAuthenticated, getUserInfo, getPetListInfo, getPetInfo, updateUser, changeCurrentPet } from './Autho/Repository';
import './App.css';
import './App.scss';

import LoginLogout from './Autho/login_register/LoginRegister';
import ProtectedRoute from './Autho/ProtectedRoute';
import Home from './Home/Home';
import Timeline from './TimeLine/Timeline';
//import Chat from './Chat/Chat';
//import Settings from './Settings/Settings';
import TopNav from './Navigation/TopNav';
import PetProfile from './Pet/PetProfile';


import Unauthorized from './Autho/Unauthorized';
import RegisterPet from './Pet/RegisterPet';
import BottomNav from './Navigation/BottomNav';
import ScrollToTop from './HelperComponents/ScrollToTop';

import UserProfile from './User/UserProfile';



import {
  //BrowserView,
  MobileView
  //isBrowser,
  //isMobile
} from "react-device-detect";

function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState([]);
  const [petDetails, setPetDetails] = useState([]); 
  const [petList, setPetList] = useState([]);
  const [currentPet, setCurrentPet] = useState(0);
  const [updateState, setUpdateState] = useState(0)

  useEffect(() => {
    checkLoggedinStatus() 
  }, [])


  const handleLogin = (data) => {
    setLoggedIn(true) 
    checkLoggedinStatus();
  }

  const checkLoggedinStatus = () => {
    if ( isAuthenticated() ){
      getUserInfo()
        .then((res) => {
            setLoggedIn(true)
            setUserDetails(res)
            setCurrentPet(res.pet_id)

            getPetListInfo()
            .then(res => {
                res.length === 0 ? setPetDetails(0) : setPetList(res);
            })
            .catch(err => {
                console.log(err, "catch")
            })
        })
        .catch(err => {
          localStorage.removeItem('x-access-token');
          setLoggedIn(false)
            })
    } else if ( localStorage.getItem('x-access-token-expiration') < Date.now()) {
        localStorage.removeItem('x-access-token-expiration');
        localStorage.removeItem('x-access-token');
        setLoggedIn(false)
        console.log('logged out')
        
    } else {
      setLoggedIn(false)
    }
  }

  const getCurrentPet = (data) => {
    if(currentPet !== 0) {
      
      for(let i = 0; i < data.length; i++) {
        if(data[i].user_id === userDetails.id && userDetails.pet_id === data[i].pet_id) {
          getPetInfo(userDetails.pet_id)
          .then(res => {
            setPetDetails(res[0])
          })
          .catch(err => console.log(err))
        }
      }
    }
  }
  
  const updateUserData = () => {
    updateUser()
    .then(res =>  setUserDetails(res))
    .catch(err => console.log(err))
    .finally(() => {
      getUserInfo()
        .then((res) => {
            setUserDetails(res)
        })
        .catch(err => {
          localStorage.removeItem('x-access-token');
          setLoggedIn(false)
        })
    })
  }

  const changeUserCurrentPet = (id) => {
    changeCurrentPet(id)
      .then(res => {
        setCurrentPet(id)
      })
      .catch(err => console.log(err))
      const helper = () => {
        getCurrentPet(petList)
      }
      helper()
    }

  useEffect(()=> {
    getCurrentPet(petList)
  }, [userDetails])
  
  useEffect(()=> {
    updateUserData()
  }, [currentPet])
   

  const test = () => {
    console.log('updated')
  }

  return (
    <div className="App">
      <div 
          className={isLoggedIn ? 'body-container' : 'body-container-login'}
          style={ isLoggedIn ? {margin: '70px 10px'} : {margin: '0px', backgroundColor: '#b3E5FC'} }>
        <Router >
        <ScrollToTop />
          {isLoggedIn ? (
                <TopNav 
                  changePet={(id) => changeUserCurrentPet(id)}
                  userDetails={userDetails} 
                  petDetails={petDetails}
                  petList={petList}
                  isLoggedIn={isLoggedIn} 
                  currentPet={currentPet}
                  logout={() => setLoggedIn(false)}/>
              ) : (
                ""
              )}
             
          <Switch>
                
            <Fragment>
              <Route 
                exact path="/" 
                render={props => (
                  <LoginLogout 
                    {...props}
                    userDetails={userDetails}
                    isLoggedIn={isLoggedIn}
                    handleLogin={handleLogin}
                  />
                )}
                />
              <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  petDetails={petDetails}
                  exact path='/home' 
                  component={Home} />
              <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  petDetails={petDetails}
                  currentPet={currentPet}
                  updatePetImage={() => getCurrentPet(petList)}
                  exact path='/pet-profile' 
                  updateUserData={() => updateUserData()}
                  component={PetProfile} />
              <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  petDetails={petDetails}
                  exact path='/register-pet' 
                  updateUserData={() => updateUserData()}
                  component={RegisterPet} />
              <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  petDetails={petDetails}
                  exact path='/timeline' 
                  component={Timeline} />
              <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  petDetails={petDetails}
                  currentPet={currentPet}
                  petList={petList}
                  updateUserImage={() => updateUserData()}
                  exact path='/user-profile' 
                  component={UserProfile} />

              <Route exact path='/unauthorized' component={Unauthorized} />
            </Fragment>
          </Switch>
          { isLoggedIn ? 
            (
              <MobileView>
                <BottomNav 
                  userDetails={userDetails}
                  petDetails={petDetails}/>
              </MobileView>
            ) : ('') 
          }
        </Router>
      </div>
    </div>
  );
}

export default App;
