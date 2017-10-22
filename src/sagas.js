import {call, put, take, apply, takeLatest, fork, task, all, cancel, cancelled} from 'redux-saga/effects';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MSG, MSG_RECIEVED, LOGIN_REQUEST, LOG_OUT, SIGN_UP_REQUEST} from './actions/types';
import axios from 'axios';
import history from './history';
import { storeToken, clearToken, getToken } from './storageApi'

const ROOT_URL = "http://localhost:3090";


function * fetchMessage(){
  while(true){
    yield take(FETCH_MSG);
    const response = yield apply(axios, axios.get, [ROOT_URL, { headers:{ authorization: getToken() }}] )
    yield put({type: MSG_RECIEVED, payload: response.data.message });
  }
}


function * authorize(email, password){
  try{
    const response = yield apply(axios, axios.post, [`${ROOT_URL}/signin`, {email, password}]);
    console.log("axios posted");
    yield call(storeToken, response.data.token);
    yield put({type: AUTH_USER});
    yield apply(history, history.push, ['/feature']);
  }
  catch(err){
    console.log(err);
    yield put({type: "LOGIN_ERROR"});
  }
  finally{
    if(yield cancelled()){
      console.log("Special cancelled request logic wohoo!");
    }
  }
}

function * logout(){
  console.log("from independent logout");
  while(true){
    yield take(LOG_OUT);
    yield call(clearToken);
    yield put({type: UNAUTH_USER});
  }
}


function * loginFlow(){
  while(true){
    const {email, password} = yield take(LOGIN_REQUEST);
    const task = yield fork(authorize, email, password);
    const action = yield take([LOG_OUT, "LOGIN_ERROR"]);
    if(action.type == LOG_OUT){
      console.log("from login flow");
      yield cancel(task);
    }
    if(action.type == "LOGIN_ERROR"){
      yield put({type: AUTH_ERROR, payload: "Bad Login Information"});
    }
  }
};


function * signUpUser(email, password) {
  try{
    const newUser = yield apply(axios, axios.post,[`${ROOT_URL}/signup`, {email, password}]);
    yield console.log(newUser);
    // yield put({type: NEW_USER_SIGN_UP});
    if(newUser.data.sigupSuccess){
      yield apply(history, history.push,['/signin']);
      console.log("history pushed")
    }
  }
  catch(err){
    console.log(err)
    yield put({type:AUTH_ERROR});
  }
  finally{
    if(yield cancelled()){
      console.log("Special cancelled Sign up logic, woohoo!")
    }
  }
}



function * signUpFlow() {
  while(true){
    const {email, password} = yield take(SIGN_UP_REQUEST);
    yield call(signUpUser, email, password);
  }
}


export default function* (){
  yield all([loginFlow(), signUpFlow(), fetchMessage(), logout()]);
}