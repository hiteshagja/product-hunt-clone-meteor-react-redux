import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialSignInState = {
  signIn_toggle: false,
  userId: Meteor.userId(),
  role: Meteor.user() ? Meteor.user().role['default-group'][0] : 'user'
}

export const signInReducer = createReducer(initialSignInState, {
  [types.SIGNIN_TOGGLE](state,action) {
    return Object.assign({}, state, {
      signIn_toggle: action.signIn_toggle
    })
  },

  [types.SIGNIN_FACEBOOK](state,action) {
    return Object.assign({}, state, {
      userId: action.userId,
      role: action.role
    })
  },

  [types.SIGNIN_TWITTER](state,action) {
    return Object.assign({}, state, {
      userId: action.userId,
      role: action.role
    })
  },

  [types.SIGNOUT](state,action){
    return Object.assign({}, state, {
      userId: null
    })
  }
});
