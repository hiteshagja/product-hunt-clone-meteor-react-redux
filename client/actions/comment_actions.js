import * as types from './types'
import {Meteor} from 'meteor/meteor';

export function addComment(data) {
  return (dispatch, getState) => {
    Meteor.call('addComment', data, function(err, res) {
      dispatch({
        type: types.COMMENT_ADD,
        commentId: res
      })
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
