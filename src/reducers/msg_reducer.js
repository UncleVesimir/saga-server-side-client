import { MSG_RECIEVED } from "../actions/types"
export default function(state = {}, action){
  switch(action.type){
    case MSG_RECIEVED: {
      return {...state, message: action.payload };
    }
    default: return state;
  }
}