import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Repository';

function ProtectedRoute({ component: Component, isLoggedIn, ...rest }) {

    return (
      <Route {...rest} render={
        props => {
          if (isAuthenticated()) {
            return <Component {...rest} {...props} />
          } else {
            return <Redirect to={
              {
                pathname: '/unauthorized',
                state: {
                  from: props.location
                }
              }
            } />
          }
        }
      } />
    )
  }

export default ProtectedRoute;