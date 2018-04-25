import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NoteIcon from 'material-ui/svg-icons/communication/message';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';

import './Task.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

export default class Task extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  handleEdit(e) {
    this.setState({isEditing: true}, this.focusInput);
  }

  handleCancel() {
    this.cancelTask();
  }

  handleSave() {
    this.saveTask();
  }

  handleCheck() {
    this.props.onStatusChange({
      isCompleted: !this.props.isCompleted
    });
  }
  
  handleKeyDown(e) {
    if(e.keyCode === ENTER_KEY) {
      this.saveTask();
    }
    if(e.keyCode === ESC_KEY) {
      this.cancelTask();
    }
  }

  focusInput() {
    this.text.focus();
  }

  saveTask() {
    this.props.onUpdate({
      text: this.text.value,
      note: this.note.value
    });
    this.setState({isEditing: false});
  }

  cancelTask() {
    this.setState({isEditing: false});
  }

  render() {
    const {text, note, due, isCompleted, onDelete} = this.props;
    return (
      this.state.isEditing
      ?
        <div className='Task editing'>
          <input
            className='Task__text-input'
            type='text'
            defaultValue={this.props.text}
            onKeyDown={this.handleKeyDown.bind(this)}
            ref={c => this.text = c}
          />
          <textarea
            className='Task__note-input'
            type='text'
            defaultValue={note}
            onKeyDown={this.handleKeyDown.bind(this)}
            ref={c => this.note = c}
          />

          <div className='Task__toolbar'>
            <div>
              <RaisedButton primary onClick={this.handleSave.bind(this)} label='Save' />
              <FlatButton onClick={this.handleCancel.bind(this)} label='Cancel' />
            </div>
          </div>
        </div>
      :
        <div className='Task'>
          <Checkbox
            className='Task__checkbox'
            checked={this.props.isCompleted}
            onCheck={this.handleCheck.bind(this)}
          />
          <div className='Task__text' onClick={this.handleEdit.bind(this)}>
            <div className='Task__title'>
              {text}
              {
                note
                ?
                  <span title={note}>
                    <NoteIcon className='Task__note' />
                  </span>
                :
                  null
              }
            </div>
            {
              due
              ?
                <div className='Task__due'>
                  {'due ' + moment(due).fromNow()}
                </div>
              :
                null
            }
          </div>
          <IconMenu iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}>
            <MenuItem onClick={this.handleEdit.bind(this)}>Edit</MenuItem>
            <MenuItem onClick={onDelete}>Delete</MenuItem>
          </IconMenu>
        </div>
    )
  }
}