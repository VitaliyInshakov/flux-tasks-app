import LoginPage from '../components/LoginPage.jsx';
import React from 'react';
import SessionActions from '../actions/SessionActions';
import SessionStore from '../stores/SessionStore';


function getStateFromFlux() {
  return {
    isLoggedIn: SessionStore.isLoggedIn()
  }
}
export default class LoginPageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = getStateFromFlux();
  }
  
  componentDidMount() {
    SessionStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.isLoggedIn) {
      const {location} = this.props
      if(location.state && location.state.nextPathname) {
        this.props.history.replace(location.state.nextPathname);
      } else {
        this.props.history.replace('/lists');
      }
    }
  }

  componentWillUnmount() {
    SessionStore.removeChangeListener(this._onChange.bind(this));
  }

  handleLogin() {
    SessionActions.authorize();
  }
  
  _onChange() {
    this.setState(getStateFromFlux());
  }
  render() {
    return (
      <LoginPage onLogIn={this.handleLogin.bind(this)}/>
    )
  }
}