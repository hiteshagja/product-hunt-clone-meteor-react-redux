import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialPostReducer = {
  post_toggle: false,
  post_add: '',
  post_update: 0,
  post_get: {},
  post_getAll: []
}

export const postReducer = createReducer(initialPostReducer,{
  [types.POST_TOGGLE](state,action) {
    return Object.assign({}, state, {
      post_toggle: action.post_toggle
    })
  },

  [types.POSTS_ADD](state,action) {
    return Object.assign({}, state, {
      post_add: action.postId
    })
  },

  [types.POSTS_UPDATE](state,action) {
    return Object.assign({}, state, {
      post_update: action.post_update
    })
  },

  [types.POSTS_GET](state,action) {
    return Object.assign({}, state, {
      post_get: action.post
    })
  },

  [types.POSTS_GET_ALL](state,action) {
    return Object.assign({}, state, {
      post_getAll: action.posts
    })
  }
});

// export const PostAdd = createReducer(0,{
// });

// export const editPost = createReducer(0,{
// });

// export const Posts = createReducer([],{
// });
