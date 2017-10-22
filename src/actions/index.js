import axios from 'axios';
import { FETCH_MSG, LOGIN_REQUEST, LOG_OUT, SIGN_UP_REQUEST} from './types'
import history from '../history'

// Get the current location NOT RECOMMENDED TO USE AS THIS IS MUTABLE AND MAY NOT BE CORRECT IF
// CERTAIN HOOKS HAVE SIDE EFFECTS. USE LOCATION PROPERTY FROM ROUTE PROPS INSTEAD/
export function dispatchLoginRequest(email, password){
  return {
    type: LOGIN_REQUEST,
    email,
    password
  }
};
export function dispatchLogoutRequest(){
  return {
    type: LOG_OUT
  };
};

export function dispatchSignupRequest({email, password}){
  return {
    type:SIGN_UP_REQUEST,
    email,
    password
  }
}

export function fetchMessage() {
  return {
    type: FETCH_MSG
  }
}