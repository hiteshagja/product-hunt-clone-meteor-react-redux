import {Meteor} from 'meteor/meteor';
import {Categories} from '../collections/categories.js';

Meteor.methods({
  addCategory: function (data) {
    return Categories.insert(data);
  },

  updateCategory: function (data) {
    return Categories.update(data.categoryId, {$set: data});
  },

  getAllCategories: function () {
    return Categories.find().fetch();
  },

  getCategory: function (categoryId) {
    return Categories.findOne(categoryId);
  }
})
