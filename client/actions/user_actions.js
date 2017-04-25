import * as types from './types'
import {Meteor} from 'meteor/meteor';

export function superUserCheck(data, cb) {
  return (dispatch, getState) => {
    Meteor.call('superUserCheck', data, function (err, res) {
      if (!err) {
        cb(res)
      }
    })
  }
}

export function getCurrentUser() {
  return (dispatch, getState) => {
    Meteor.call('getCurrentUser', function (err, res) {
      dispatch({
        type: types.CURRENT_USER,
        current_user: res
      })
    })
  }
}


export function getUserProfile(slug) {
  return (dispatch, getState) => {
    // console.log(slug.substr(1));
    Meteor.call('getUserProfile',slug,function (err, res) {
      dispatch({
        type: types.USER_PROFILE,
        user_profile: res
      })
    })
  }
}
