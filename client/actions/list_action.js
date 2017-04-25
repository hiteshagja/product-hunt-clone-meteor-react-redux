import * as types from './types'
import {
  Meteor
} from 'meteor/meteor';


export function addList(data, cb) {
  return (dispatch, getState) => {
    Meteor.call('addnewlist', data, function(err, res) {
      cb(err, res)
    })
  }
}

export function getList(user) {
  return (dispatch, getState) => {
    Meteor.call('getlist',user,function(err, res) {
      if(res!=undefined){
        dispatch({
          type: types.LIST_DATA,
          list_data: res
        })
      }else{
        dispatch({
          type: types.LIST_DATA,
          list_data: []
        })
      }
    })
  }
}

export function updateList(listId, postId, cb) {
  return (dispatch, getState) => {
    Meteor.call('updateList',listId,postId,function(err, res) {
      // if(res){
      //   dispatch({
      //     type: types.LIST_TOGGLE,
      //     isOpen: false
      //   })
      // }
      cb(err, res)
    })
  }
}

export function singleListData(collectionSlug) {
  return (dispatch, getState) => {
    Meteor.call('singleListData', collectionSlug, function(err, res) {
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

export function updateCollection(data, cb) {
  return (dispatch, getState) => {
    Meteor.call('updateCollection', data, function(err, res) {
      cb(err, res)
    })
  }
}

export function getAdminCollections(data) {
  return (dispatch, getState) => {
    Meteor.call('getAdminCollections', function(err, res) {
      dispatch({
        type: types.ADMIN_COLLECTION_GET,
        admin_collections: res
      })
    })
  }
}
