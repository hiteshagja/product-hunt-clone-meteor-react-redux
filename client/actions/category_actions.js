import * as types from './types'
import {
  Meteor
} from 'meteor/meteor';

export function toggleCategoryModal(value) {
  return (dispatch, getState) => {
    dispatch({
      type: types.CATEGORY_TOGGLE,
      category_toggle: value
    })
  }
}

export function addCategory(data) {
  return (dispatch, getState) => {
    Meteor.call('addCategory', data, function(err, res) {
      dispatch({
        type: types.CATEGORY_ADD,
        categoryId: res
      })
    })
  }
}

export function updateCategory(data) {
  return (dispatch, getState) => {
    Meteor.call('updateCategory', data, function(err, res) {
      console.log('-------------------------------');
      console.log(res);
      dispatch({
        type: types.CATEGORY_UPDATE,
        category_update: res
      })
    })
  }
}

export function getCategory(categoryId) {
  return (dispatch, getState) => {
    Meteor.call('getCategory', categoryId, function(err, res) {
      dispatch({
        type: types.CATEGORY_GET,
        category: res
      })
    })
  }
}

export function getAllCategory() {
  return (dispatch, getState) => {
    Meteor.call('getAllCategories', function(err, res) {
      dispatch({
        type: types.CATEGORY_GET_ALL,
        category_getAll: res
      })
    })
  }
}
