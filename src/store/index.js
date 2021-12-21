import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import apiMiddleware from "../middleware/api";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(applyMiddleware(apiMiddleware))
);
window.store = store;
export default store;
