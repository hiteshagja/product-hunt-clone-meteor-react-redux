import * as types from './types'
import {
  Meteor
} from 'meteor/meteor';


export function addList(listname,postId) {
  return (dispatch, getState) => {
    Meteor.call('addnewlist',listname,postId,function(err, res) {

    })
  }
}

export function getList(user) {
  return (dispatch, getState) => {
    Meteor.call('getlist',user,function(err, res) {
      dispatch({
        type: types.LIST_DATA,
        list_data: res
      })
    })
  }
}

export function updateList(listId,postId) {
  return (dispatch, getState) => {
    Meteor.call('updateList',listId,postId,function(err, res) {
      if(res){
        dispatch({
          type: types.LIST_TOGGLE,
          isOpen: false
        })
      }
    })
  }
}

export function singleListData(listId) {
  return (dispatch, getState) => {
    Meteor.call('singleListData',listId,function(err, res) {
      dispatch({
        type: types.SINGLE_LIST_DATA,
        data: res
      })
    })
  }
}

export function collectionName(categorySulg) {
  return (dispatch, getState) => {
    Meteor.call('collectionName',categorySulg,function(err, res) {
      dispatch({
        type: types.COLLECTION_NAME,
        categoryName: res
      })
    })
  }
}
