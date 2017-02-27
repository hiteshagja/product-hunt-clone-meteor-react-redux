import * as types from './types'
import {
  Meteor
} from 'meteor/meteor';

export function togglePostModal(value) {
  return (dispatch, getState) => {
    dispatch({
      type: types.POST_TOGGLE,
      post_toggle: value
    })
  }
}

export function addPost(data) {
  return (dispatch, getState) => {
    Meteor.call('insertPost', data, function(err, res) {
      dispatch({
        type: types.POSTS_ADD,
        postId: res
      })
    })
  }
}

export function editPost(data) {
  return (dispatch, getState) => {
    Meteor.call('updatePost', data, function(err, res) {
      dispatch({
        type: types.POSTS_UPDATE,
        post_update: res
      })
    })
  }
}

export function getPost(postId) {
  return (dispatch, getState) => {
    Meteor.call('getPost', postId, function(err, res) {
      dispatch({
        type: types.POSTS_GET,
        post: res
      })
    })
  }
}

export function getAllPost() {
  return (dispatch, getState) => {
    Meteor.call('getAllPost', function(err, res) {
      dispatch({
        type: types.POSTS_GET_ALL,
        posts: res
      })
    })
  }
}
