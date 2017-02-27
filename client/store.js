import React, {Component} from 'react';
// import { Meteor } from 'meteor/meteor';
// import { render } from 'react-dom';

import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './reducers'

// import { Router, Route, browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


const loggerMiddleware = createLogger();
const store = configureStore({});


function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

export default store;

// export default class AppProvider extends Component {
//   render() {
//     return (
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );
//   }
// }

//
// Meteor.startup(() => {
//   render(<AppProvider />, document.getElementById('root'));
// });
