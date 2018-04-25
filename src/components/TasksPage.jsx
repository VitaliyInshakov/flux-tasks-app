import ActionDelete from 'material-ui/svg-icons/action/delete';
import CircularProgress from 'material-ui/CircularProgress';
import ContentAdd from 'material-ui/svg-icons/content/add';
import IconButton from 'material-ui/IconButton';
import React from 'react';
import Task from './Task.jsx';

import './TasksPage.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

export default class TasksPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isEditingTaskList: false
    }
  }

  handleEditingTaskList() {
    this.setState(
      {isEditingTaskList: true},
      () => this.taskList.focus()
    )
  }
  handleSubmitTaskList() {
    this.saveTaskList();
  }

  handleTaskListEditKeyDown(e) {
    if (e.keyCode === ENTER_KEY) this.saveTaskList();
    if (e.keyCode === ESC_KEY) this.cancelEditingTaskList();
  }

  saveTaskList() {
    this.props.onUpdateTaskList({
      name: this.taskList.value
    });
  }

  cancelEditingTaskList() {
    this.setState({isEditingTaskList: false})
  }

  render() {
    if(this.props.error) {
      return (
        <div className='TasksPage'>
          <div className='TasksPage__error'>
            {this.props.error}
          </div>
        </div>
      )
    }

    return (
      <div className='TasksPage'>
        <div className='TasksPage__header'>
        {
          this.state.isEditingTaskList
          ?
            <input
              ref={c => this.taskList = c}
              className='TasksPage__title-input'
              defaultValue={this.props.taskList.name}
              onKeyDown={this.handleTaskListEditKeyDown.bind(this)}
              onBlur={this.cancelEditingTaskList.bind(this)}
            />
          :
          <h2
            className='TasksPage__title'
            onClick={this.handleEditingTaskList.bind(this)}
          >
            {this.props.taskList.name}
          </h2>
        }
          <div className='TasksPage__tools'>
            <IconButton onClick={this.props.onAddTask}>
              <ContentAdd />
            </IconButton>
            <IconButton onClick={this.props.onDeleteTaskList}>
              <ActionDelete />
            </IconButton>
          </div>
        </div>
        {
          this.props.isLoadingTasks
          ?
            <CircularProgress />
          :
          <div className='TasksPage__tasks'>
            {
              this.props.tasks.map(task => 
                <Task
                  key={task.id}
                  text={task.text}
                  note={task.note}
                  due={task.due}
                  isCompleted={task.isCompleted}
                  onDelete={this.props.onTaskDelete.bind(this, task.id)}
                  onStatusChange={this.props.onTaskStatusChange.bind(this, task.id)}
                  onUpdate={this.props.onTaskUpdate.bind(this, task.id)}
                />
              )
            }
          </div>
        }
      </div>
    )
  }
}