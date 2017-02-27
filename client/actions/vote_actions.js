import * as types from './types'
import {Meteor} from 'meteor/meteor';

export function vote(sourceId) {
  return (dispatch, getState) => {
    Meteor.call('addVote', sourceId, function (err, res) {
    })
  }
}

export function getVoteCount(sourceId) {
  return (dispatch, getState) => {
    Meteor.call('getVoteCount', sourceId, function (err, res) {
      dispatch({
        type: types.VOTE_COUNT,
        vote_count: res
      })
    })
  }
}
