import * as types from './types'
import {Meteor} from 'meteor/meteor';

export function addComment(data, cb) {
  return (dispatch, getState) => {
    Meteor.call('addComment', data, function(err, res) {
      cb(err, res)
    })
  }
}

export function updateComment(data) {
  return (dispatch, getState) => {
    Meteor.call('updateComment', data, function(err, res) {
      dispatch({
        type: types.COMMENT_UPDATE,
        comment_update: res
      })
    })
  }
}

export function getPostComments(postId) {
  return (dispatch, getState) => {
    Meteor.call('getPostComments', postId, function(err, res) {
      dispatch({
        type: types.COMMENTS_OF_POST,
        post_comments: res
      })
    })
  }
}

export function getCommentCount(postId, cb) {
  return (dispatch, getState) => {
    Meteor.call('getCommentCount', postId, function(err, res) {
      cb(res)
    })
  }
}
