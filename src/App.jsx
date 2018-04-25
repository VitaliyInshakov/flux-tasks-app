import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles/base.less';

injectTapEventPlugin();

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          {this.props.children}
        </div>
      </MuiThemeProvider>
    )
  }
}