import { combineReducers } from 'redux'
import * as signInReducer from './signIn_reducers';
import * as postReducer from './post_reducers';
import * as categoryReducer from './category_reducers';
import * as commentReducer from './comment_reducers';
import * as listAction from './list_reducer';
import * as voteReducer from './vote_reducers';
import * as userReducer from './user_reducers';
import * as adminCollectionReducer from './adminCollection_reducers';
import * as errorReducer from './error';


export default combineReducers(Object.assign(
  signInReducer,
  postReducer,
  categoryReducer,
  commentReducer,
  listAction,
  voteReducer,
  userReducer,
  adminCollectionReducer,
  errorReducer
));
