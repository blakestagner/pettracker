import { useState, useEffect, Fragment } from 'react';
import { BrowserRouter as  Router, Switch, Route } from 'react-router-dom';
import { isAuthenticated, getUserInfo, getPetInfo } from './Autho/Repository';
import './App.css';

import LoginLogout from './Autho/login_register/LoginRegister';
import ProtectedRoute from './Autho/ProtectedRoute';
import Home from './Home/Home';
import Timeline from './TimeLine/Timeline';
import Chat from './Chat/Chat';
import Settings from './Settings/Settings';
import TopNav from './Navigation/TopNav';
import PetProfile from './Pet/PetProfile';

import Unauthorized from './Autho/Unauthorized';
import Logout from './Autho/login_register/Logout';

import BottomNav from './Navigation/BottomNav';
import ScrollToTop from './HelperComponents/ScrollToTop';



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

  useEffect(() => {
    checkLoggedinStatus();
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
        })
        .catch(err => {
          localStorage.removeItem('x-access-token');
          setLoggedIn(false)
            })
    getPetInfo()
        .then(res => {
            res.length === 0 ? setPetDetails(0) : setPetDetails(res);
        })
        .catch(err => {
            console.log(err, "catch")
        })
    } else if ( localStorage.getItem('x-access-token-expiration') < Date.now()) {
        localStorage.removeItem('x-access-token-expiration');
        localStorage.removeItem('x-access-token');
        setLoggedIn(false)
    } else {}
  }

  return (
    <div className="App">
      <div className="body-container" style={ isLoggedIn ? {margin: '70px 10px'} : {margin: '0px'} }>
        <Router >
        <ScrollToTop />
          {isLoggedIn ? (<TopNav userDetails={userDetails} petDetails={petDetails} isLoggedIn={isLoggedIn} logout={() => setLoggedIn(false)}/>) : ("")}
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
                  exact path='/pet-profile' 
                  component={PetProfile} />
              <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  exact path='/timeline' 
                  component={Timeline} />
              <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  exact path='/Chat' 
                  component={Chat} />
              <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  userDetails={userDetails}
                  exact path='/settings' 
                  component={Settings} />
                  
              <Route exact path='/unauthorized' component={Unauthorized} />
            </Fragment>
          </Switch>
          { isLoggedIn ? 
            (
              <MobileView>
                <BottomNav />
              </MobileView>
            ) : ('') 
          }
        </Router>
      </div>
    </div>
  );
}

export default App;
