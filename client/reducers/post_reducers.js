import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialPostReducer = {
  post_toggle: false,
  post_get: {},
  post_getAll: [],
  user_post: [],
  loadingText:'loading...',
  postDateDetail:null,
  postCount: 0
}

export const postReducer = createReducer(initialPostReducer,{
  [types.POST_TOGGLE](state,action) {
    return Object.assign({}, state, {
      post_toggle: action.post_toggle
    })
  },

  [types.POSTS_GET](state,action) {
    return Object.assign({}, state, {
      post_get: action.post
    })
  },

  [types.POSTS_GET_ALL](state,action) {
    if (action.actionType == 'rebind' || action.actionType == 'vote') {
      return Object.assign({}, state, {
        postCount: action.posts.length,
        post_getAll: action.posts
      })
    }
    else {
      return Object.assign({}, state, {
        postCount: action.posts.length,
        post_getAll: [
          ...state.post_getAll,
          ...action.posts
        ]
      })
    }
  },

  [types.POSTS_GET_USER](state,action) {
    return Object.assign({}, state, {
      user_post: action.user_post
    })
  },

  [types.POST_LOADING](state,action) {
    return Object.assign({}, state, {
      loadingText: action.text
    })
  },

  [types.POST_PAGING_DETAIL](state,action) {
    return Object.assign({}, state, {
      postDateDetail: action.data
    })
  }

});
