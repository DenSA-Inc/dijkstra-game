import { TRAVERSED } from "../actions";

let defaultState = {
  traversed: 0,
};

export default (state = defaultState, action) => {
  if (action.type === TRAVERSED){
    return {...state, traversed: state.traversed + action.edge.getWeigth()};
  }

  return state;
};
