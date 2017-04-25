import * as types from './types'
import {
  Meteor
} from 'meteor/meteor';

export function toggleSignInModal(value) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SIGNIN_TOGGLE,
      signIn_toggle: value
    })
  }
}

export function signInWithFacebook(cb) {
  return (dispatch, getState) => {
    Meteor.loginWithFacebook(function (err, res) {
      Meteor.call('assignRoleToUser', function () {
        dispatch({
          type: types.SIGNIN_FACEBOOK,
          signIn_facebook: 'SUCCESS',
          userId: Meteor.userId(),
          role: Meteor.user().roles['default-group'][0],
          error: err
        })
        cb(err, res)
      })
    })
  }
}

export function signInWithTwitter(cb) {
  return (dispatch, getState) => {
    Meteor.loginWithTwitter(function (err, res) {
      Meteor.call('assignRoleToUser', function () {
        dispatch({
          type: types.SIGNIN_TWITTER,
          signIn_twitter: 'SUCCESS',
          userId: Meteor.userId(),
          role: Meteor.user().roles['default-group'][0],
          error: err
        })
        cb(err, res)
      })
    })
  }
}

export function signOut(cb) {
  return (dispatch, getState) => {
    Meteor.logout(function (err, res) {
      dispatch({
        type: types.SIGNOUT,
        signOut: 'SUCCESS',
        userId: null
      })
      cb(err, res)
    })
  }
}
