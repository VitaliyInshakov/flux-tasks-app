import React from 'react';
import TaskListsActions from '../actions/TaskListsActions';
import TaskListCreateModal from '../components/TaskListCreateModal.jsx';
import TasklistsPage from '../components/TasklistsPage.jsx'
import TaskListsStore from '../stores/TaskListsStore';

function getStateFromFlux() {
  return {
    taskLists: TaskListsStore.getTaskLists(),
    isCreatingTaskList: false
  }
}

export default class TasklistsPageContainer extends React.Component{
   constructor(props){
     super(props);
     this.state = getStateFromFlux()
   }

   componentWillMount() {
     TaskListsActions.loadTaskLists();
   }

   componentDidMount() {
    TaskListsStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    TaskListsStore.removeChangeListener(this._onChange.bind(this));
  }

  handleLogOut() {

  }

  handleAddTaskList() {
    this.setState({isCreatingTaskList: true});
  }

  handleClose() {
    this.setState({isCreatingTaskList: false});
  }

  handleTaskListSubmit(taskList) {
    TaskListsActions.createTaskList(taskList);
    this.setState({isCreatingTaskList: false});
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

  render() {
    return (
      <div>
        <TasklistsPage
          taskLists={this.state.taskLists}
          onAddTaskList={this.handleAddTaskList.bind(this)}
          onLogOut={this.handleLogOut.bind(this)}
          history={this.props.history}
        />
        <TaskListCreateModal
          isOpen={this.state.isCreatingTaskList}
          onSubmit={this.handleTaskListSubmit.bind(this)}
          onClose={this.handleClose.bind(this)}
        />
      </div>
    )
  }
}