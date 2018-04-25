import AboutPage from './components/AboutPage.jsx';
import App from './App.jsx';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import LoggedInLayout from './components/LoggedInLayout.jsx';
import LoginPage from './containers/LoginPage.jsx';
import TasklistsPage from './containers/TasklistsPage.jsx';
import TasksPage from './components/TasksPage.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import SessionActions from './actions/SessionActions';
import SessionStore from './stores/SessionStore';



window.handleGoogleApiLoaded = () => {
  SessionActions.authorize(true, renderApp);
}

function renderApp() {
  ReactDOM.render(
    <Router>
      <App>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <LoggedInLayout>
            <Switch>
              <Route path='/about' render={(props)=> requireAuth(props, AboutPage)} />
              <Route path='/lists' render={(props)=> requireAuth(props, TasklistsPage)} />
            </Switch>
          </LoggedInLayout>
        </Switch>
      </App>
    </Router >,
    document.getElementById('mount-point')
  )
}
function requireAuth(props, WrappedComponent) {
  if(!SessionStore.isLoggedIn()) {
    return <Redirect to={{pathname: '/', state: {nextPathname: props.location.pathname}}} />
  } else {
    return <WrappedComponent {...props}/>
  }
}