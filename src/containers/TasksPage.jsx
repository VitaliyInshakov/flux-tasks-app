import React from 'react';
import TasksActions from '../actions/TasksActions';
import TaskListsActions from '../actions/TaskListsActions';
import TaskListsStore from '../stores/TaskListsStore';
import TaskCreateModal from '../components/TaskCreateModal.jsx';
import TasksPage from '../components/TasksPage.jsx'
import TasksStore from '../stores/TasksStore';

function getStateFromFlux() {
  return {
    tasks: TasksStore.getTasks(),
    error: TasksStore.getError(),
    isLoadingTasks: TasksStore.isLoadingTasks(),
    taskList: TaskListsStore.getCurrentTaskList() || {},
    isCreatingTask: false
  }
}

export default class TasksPageContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = getStateFromFlux()
  }

  componentWillMount() {
    TasksActions.loadTasks(this.props.match.params.id);
    TaskListsActions.loadTaskList(this.props.match.params.id);
  }

  componentDidMount() {
    TasksStore.addChangeListener(this._onChange.bind(this));
    TaskListsStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id !== nextProps.match.params.id) {
      TasksActions.loadTasks(nextProps.match.params.id);
      TaskListsActions.loadTaskList(nextProps.match.params.id);
    }
  }

  componentWillUnmount() {
    TasksStore.removeChangeListener(this._onChange.bind(this));
    TaskListsStore.removeChangeListener(this._onChange.bind(this));
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

  handleTaskStatusChange(taskId, {isCompleted}) {
    TasksActions.updateTaskStatus({
      taskListId: this.props.match.params.id,
      taskId: taskId,
      isCompleted: isCompleted
    });
  }

  handleTaskUpdate(taskId, task) {
    TasksActions.updateTask({
      taskListId: this.props.match.params.id,
      taskId: taskId,
      ...task
    });
  }

  handleAddTask() {
    this.setState({isCreatingTask: true})
  }

  handleTaskDelete(taskId) {
    TasksActions.deleteTask({
      taskListId: this.props.match.params.id,
      taskId: taskId
    });
  }

  handleClose() {
    this.setState({isCreatingTask: false});
  }

  handleTaskSubmit(task) {
    const taskListId = this.props.match.params.id;
    TasksActions.createTask({taskListId, ...task});
    this.setState({isCreatingTask: false});
  }

  handleDeleteTaskList() {
    const isConfirmed = confirm('Are you sure you want delete this task list? All tasks in it will be deleted too');

    if(isConfirmed) {
      TaskListsActions.deleteTaskList({
        taskListId: this.props.match.params.id
      });
    }

    this.props.history.push('/lists');
  }

  handleUpdateTaskList({name}) {
    TaskListsActions.updateTaskList({
      taskListId: this.props.match.params.id,
      name
    });
  }

  render() {
    return (
      <div>
        <TasksPage
          taskList={this.state.taskList}
          tasks={this.state.tasks}
          error={this.state.error}
          isLoadingTasks={this.state.isLoadingTasks}
          onUpdateTaskList={this.handleUpdateTaskList.bind(this)}
          onAddTask={this.handleAddTask.bind(this)}
          onDeleteTaskList={this.handleDeleteTaskList.bind(this)}
          onTaskDelete={this.handleTaskDelete.bind(this)}
          onTaskStatusChange={this.handleTaskStatusChange.bind(this)}
          onTaskUpdate={this.handleTaskUpdate.bind(this)}
        />

        <TaskCreateModal
          isOpen={this.state.isCreatingTask}
          onSubmit={this.handleTaskSubmit.bind(this)}
          onClose={this.handleClose.bind(this)}
        />
      </div>
    )
  }
}