import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialCategoryState = {
  category_toggle: false,
  category_get: {},
  category_getAll: []
}

export const categoryReducer = createReducer(initialCategoryState, {
  [types.CATEGORY_TOGGLE](state,action){
    return Object.assign({}, state, {
      category_toggle: action.category_toggle
    })
  },

  [types.CATEGORY_GET](state,action) {
    return Object.assign({}, state, {
      category_get: action.category
    })
  },

  [types.CATEGORY_GET_ALL](state,action) {
    return Object.assign({}, state, {
      category_getAll: action.category_getAll
    })
  }
});
