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
import Loading from './HelperComponents/Loading';

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
  const [isLoading, doneLoading] = useState(true);
  


  const handleLogin = (data) => {
    setLoggedIn(true) 
  }

  const handleLogout = () => {
    setPetDetails([])
    setPetList([])
    setUserDetails([])
    setCurrentPet(0)
    doneLoading(false)
    setLoggedIn(false)
  }


  const checkLoggedinStatus = () => {
    if ( isAuthenticated() ){
      getUserInfo()
        .then((res) => {
            setLoggedIn(true)
            setUserDetails(res)
            setCurrentPet(res.pet_id)
            if(res.pet_id !== 0){
              getCurrentPet(res.pet_id)
            }
            thePetList(res.pet_id)
        })
        .catch(err => {
          localStorage.removeItem('x-access-token');
          setLoggedIn(false)
            })
    } else if ( localStorage.getItem('x-access-token-expiration') < Date.now()) {
        localStorage.removeItem('x-access-token-expiration');
        localStorage.removeItem('x-access-token');
        setPetDetails([])
        setPetList([])
        setUserDetails([])
        setCurrentPet(0)
        setLoggedIn(false)
        doneLoading(false)
        
    } else {
      setPetDetails([])
      setPetList([])
      setUserDetails([])
      setCurrentPet(0)
      setLoggedIn(false)
      doneLoading(false)
    }
  }

  const thePetList = (petId) => {
    getPetListInfo()
      .then(res => {
          res.length === 0 ? setPetDetails(0) : setPetList(res);
          getCurrentPet(petId)
      })
      .catch(err => {
          console.log(err, "catch")
      })
  }
  const getCurrentPet = (id) => {
    if(currentPet !== 0) {
      getPetInfo(id)
        .then(res => {
          setPetDetails(res[0])
        })
        .catch(err => console.log(err)) 
    }
    doneLoading(false)
  }
  
  const updateUserData = (id) => {
    updateUser()
      .then(res =>  console.log('switched'))
      .catch(err => console.log(err))
  }

  const changeUserCurrentPet = (id) => {
    console.log(`app: ${id}`)
    changeCurrentPet(id) 
      .then(res => {
        updateUser()
          .then(res =>  res)
          .catch(err => console.log(err))
          .finally(() => checkLoggedinStatus())
      })
      .catch(err => console.log(err))
      .finally(() => {
        getCurrentPet(id)
      })
    }

  useEffect(()=> {
    if(userDetails.pet_id) {
      getPetInfo(userDetails.pet_id)
        .then(res => {
          setPetDetails(res[0])
          getCurrentPet(userDetails.pet_id)
        })
        .catch(err => console.log(err))
    } else {
      return;
    }
  }, [currentPet])
  
  useEffect(() => {
    if(isLoggedIn === true) {
      checkLoggedinStatus()
    } else  {
      doneLoading(false)
    }
  }, [isLoggedIn])

  useEffect(()=> {
    checkLoggedinStatus()
  }, [])

  if(isLoading === true) {
      return <Loading />
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
                  logout={() => handleLogout()}/>
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
                  changePet={(id) => changeUserCurrentPet(id)}
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  petDetails={petDetails}
                  exact path='/register-pet' 
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
                  updateUserData={() => updateUserData()}
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
