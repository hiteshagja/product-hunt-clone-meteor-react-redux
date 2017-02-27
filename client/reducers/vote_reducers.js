import createReducer from '../../lib/createReducer'
import * as types from '../actions/types'

let initialVoteState = {
  vote_count: 0,
}

export const voteReducer = createReducer(initialVoteState, {
  [types.VOTE_COUNT](state,action) {
    return Object.assign({}, state, {
      vote_count: action.vote_count
    })
  }
})
