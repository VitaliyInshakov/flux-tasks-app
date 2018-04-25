import AppConstants from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'change';

let _isLoggedIn = false;

const SessionStore = Object.assign({}, EventEmitter.prototype, {
  isLoggedIn() {
    return _isLoggedIn;
  },

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(action => {
  console.info(action.type, action);

  switch(action.type) {
    case AppConstants.SESSION_AUTHORIZE_SUCCESS:
      _isLoggedIn = true;
      SessionStore.emitChange();
      break;
    
    case AppConstants.SESSION_AUTHORIZE_FAIL:
      _isLoggedIn = false;
      SessionStore.emitChange();
      break;
  }
});

export default SessionStore;