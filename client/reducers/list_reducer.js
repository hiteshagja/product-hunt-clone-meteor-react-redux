import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialPostReducer = {
  list_data:[],
  data: {},
  categoryName:''
}

export const listtoggle = createReducer(initialPostReducer,{
  [types.LIST_DATA](state,action) {
    return Object.assign({}, state, {
      list_data: action.list_data
    })
  },
  [types.SINGLE_LIST_DATA](state,action) {
    return Object.assign({}, state, {
      data: action.data
    })
  },
  [types.COLLECTION_NAME](state,action) {
    return Object.assign({}, state, {
      categoryName: action.categoryName
    })
  }
})
