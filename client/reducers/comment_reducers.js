import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialCommentState = {
  comment_add: '',
  comment_update: 0,
  post_comments: []
}

export const commentReducer = createReducer(initialCommentState, {
  [types.COMMENT_ADD](state,action) {
    return Object.assign({}, state, {
      comment_add: action.commentId
    })
  },

  [types.COMMENT_UPDATE](state,action) {
    return Object.assign({}, state, {
      comment_update: action.comment_update
    })
  },

  [types.COMMENTS_OF_POST](state,action) {
    return Object.assign({}, state, {
      post_comments: action.post_comments
    })
  }
});
