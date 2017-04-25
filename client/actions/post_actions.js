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

export function addPost(data, cb) {
  return (dispatch, getState) => {
    Meteor.call('insertPost', data, function(err, res) {
      dispatch({
        type: types.POSTS_GET_ALL,
        posts: res
      })
      cb(err, res)
    })
  }
}

export function editPost(data, cb) {
  return (dispatch, getState) => {
    Meteor.call('updatePost', data, function(err, res) {
      cb(err, res)
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

export function getAllPost(data) {
  return (dispatch, getState) => {
    Meteor.call('getAllPost',data,function(err, res) {
      dispatch({
        type: types.POSTS_GET_ALL,
        posts: res,
        actionType: data.action
      })
      setTimeout(function () {
        dispatch({
          type: types.POST_LOADING,
          text: 'Load more'
        })
      }, 100);
    })
  }
}

export function getUserPost(slug) {
  return (dispatch, getState) => {
    Meteor.call('getUserPost',slug,function(err, res) {
      dispatch({
        type: types.POSTS_GET_USER,
        user_post: res
      })
    })
  }
}

export function postLoading(text) {
  return {
    type:types.POST_LOADING,
    text: text
  };
}

export function PostPagingDetail(data) {
  return {
    type:types.POST_PAGING_DETAIL,
    data: data
  };
}
