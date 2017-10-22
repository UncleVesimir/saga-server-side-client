import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import authReducer from './auth_reducer'
import messageReducer from './msg_reducer'
const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  message: messageReducer
});

export default rootReducer;
