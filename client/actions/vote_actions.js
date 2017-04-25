import * as types from './types'
import {Meteor} from 'meteor/meteor';

export function vote(sourceId, cb) {
  return (dispatch, getState) => {
    Meteor.call('addVote', sourceId, function (err, res) {
      cb(err, res)
    })
  }
}

export function getVoteCount(sourceId, cb) {
  return (dispatch, getState) => {
    Meteor.call('getVoteCount', sourceId, function (err, res) {
      cb(res);
    })
  }
}
