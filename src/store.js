import { compose, createStore, applyMiddleware } from "redux";


export default function makeStore(){
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(a => a, composeEnhancers(applyMiddleware()));
};
