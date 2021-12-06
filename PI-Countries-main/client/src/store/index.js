// import { createStore, applyMiddleware, compose } from "redux";
// import { composeWithDevTools} from 'redux-devtools-extension';
// import thunk from 'redux-thunk'

// import rootReducer from "../reducer";

// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk),
//       window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
//       typeof window._REDUX_DEVTOOLS_EXTENSION_ === "undefined"
//         ? (a) => a
//         : window._REDUX_DEVTOOLS_EXTENSION_ &&
//             window._REDUX_DEVTOOLS_EXTENSION_()
//     )
//   );

// export default store;

import { createStore , applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;