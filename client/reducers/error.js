import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialErrorReducer = {
  error : ''
}

export const errorReducer = createReducer(initialErrorReducer,{
  [types.ERROR](state,action) {
    return Object.assign({}, state, {
      error: action.error
    })
  },
})
