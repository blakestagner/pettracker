import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render( <App /> , document.getElementById('root')
);
reportWebVitals();
serviceWorkerRegistration.register({
    onUpdate: registration => {
      const waitingServiceWorker = registration.waiting
  
      if (waitingServiceWorker) {
        waitingServiceWorker.addEventListener("statechange", event => {
          if (event.target.state === "activated") {
            if (
              window.confirm(
                "There is a new version of the app ready. Please reload to update."
              )
            ) {
              window.location.reload()
            }
          }
        })
        waitingServiceWorker.postMessage({ type: "SKIP_WAITING" })
      }
    },
  })
