import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialUserReducer = {
  current_user : {},
  user_profile :{}
}

export const userReducer = createReducer(initialUserReducer,{
  [types.CURRENT_USER](state,action) {
    return Object.assign({}, state, {
      current_user: action.current_user
    })
  },
  [types.USER_PROFILE](state,action) {
    return Object.assign({}, state, {
      user_profile: action.user_profile
    })
  },
})
