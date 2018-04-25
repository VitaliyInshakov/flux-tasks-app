import AddIcon from 'material-ui/svg-icons/content/add';
import Divider from 'material-ui/Divider';
import ExitIcon from 'material-ui/svg-icons/action/exit-to-app';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import {List, ListItem} from 'material-ui/List';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import TasksPage from '../containers/TasksPage.jsx';
import SessionStore from '../stores/SessionStore';
import Subheader from 'material-ui/Subheader';

import './TasklistsPage.less';

export default class TasklistsPage extends React.Component{
  render() {
    return (
      <div className='TasklistsPage'>
        <div className='TasklistsPage__menu'>
          <List className='TasklistsPage__list'>
            <h3 className='TasklistsPage__title'>Almost Google Tasks</h3>
            <Divider />
            <List className='TasklistsPage__list'>
              <ListItem
                leftIcon={<HomeIcon />}
                primaryText='Home'
                onClick={this.props.history.push.bind(null, '/lists')}
              />
              <ListItem
                leftIcon={<ListIcon />}
                primaryText='About'
                onClick={this.props.history.push.bind(null, '/about')}
              />
            </List>
            <Divider />
            <Subheader>Task Lists</Subheader>
            <List className='TasklistsPage__list' subheader='Task Lists'>
              {
                this.props.taskLists.map(list => 
                  <ListItem
                    key={list.id}
                    leftIcon={<FolderIcon />}
                    style={
                      (~this.props.history.location.pathname.indexOf(list.id))
                      ?
                        { backgroundColor: 'rgba(0,0,0,0.1)' }
                      :
                        null
                    }
                    primaryText={list.name}
                    onClick={this.props.history.push.bind(null, `/lists/${list.id}`)}
                  />
                )
              }
              <ListItem
                leftIcon={<AddIcon />}
                primaryText='Create new list'
                onClick={this.props.onAddTaskList}
              />
            </List>
            <Divider />
            <List className='TasklistsPage__list'>
            <ListItem
              leftIcon={<ExitIcon />}
              primaryText='Log out'
              onClick={this.props.onLogOut}
            />
            </List>
          </List>
        </div>
        <div className='TasklistsPage__tasks'>
          <Switch>
            <Route
              path='/lists/:id'
              render={(props)=>
                !SessionStore.isLoggedIn()
                ? <Redirect to={{pathname: '/', state: {nextPathname: props.location.pathname}}} />
                : <TasksPage {...props}/>
              }
            />
          </Switch>
        </div>
      </div>
    )
  }
}