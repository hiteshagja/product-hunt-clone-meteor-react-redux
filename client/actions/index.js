import * as signInActions from './signIn_actions';
import * as postActions from './post_actions';
import * as categoryActions from './category_actions';
import * as commentActions from './comment_actions';
import * as listAction from './list_action';
import * as voteActions from './vote_actions';
import * as userActions from './user_actions';

export const ActionCreators = Object.assign({},
  signInActions,
  postActions,
  categoryActions,
  commentActions,
  listAction,
  voteActions,
  userActions
);
