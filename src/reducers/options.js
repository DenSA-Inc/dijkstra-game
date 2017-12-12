import { SET_VOLUME } from "../actions";

let defaultState = {
  volume: 1
}

export default (state = defaultState, action) => {
  if (action.type === SET_VOLUME){
    return {...state, volume: action.volume}
  }

  return state;
}
