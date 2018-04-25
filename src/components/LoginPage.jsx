import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

import './LoginPage.less';

export default class LoginPage extends React.Component{
  render() {
    return (
      <div className='LoginPage'>
        <div className='LoginPage__banner'>
          <div className='LoginPage__text'>
            <h1>Almost Google Tasks</h1>
            <p>Organize your life!</p>
            <RaisedButton
              className='login-button'
              label='Log in with Google'
              onClick={this.props.onLogIn}
            />
          </div>
          <img
            src='./img/desk.png'
            className='LoginPage__image'
          />
        </div>
      </div>
    )
  }
}