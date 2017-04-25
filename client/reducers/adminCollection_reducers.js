import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialReducer = {
  collection_toggle: false,
  admin_collections: []
}

export const adminCollectionReducer = createReducer(initialReducer,{
  [types.ADMIN_COLLECTION_TOGGLE](state,action) {
    return Object.assign({}, state, {
      collection_toggle: action.collection_toggle
    })
  },
  [types.ADMIN_COLLECTION_GET](state,action) {
    return Object.assign({}, state, {
      admin_collections: action.admin_collections
    })
  }
})
