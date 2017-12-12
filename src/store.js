import { compose, createStore, applyMiddleware } from "redux";


export default function makeStore(reducer){
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(reducer, composeEnhancers(applyMiddleware()));
};
