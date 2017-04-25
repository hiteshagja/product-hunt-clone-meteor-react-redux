import {Images} from '../lib/collections/images';
// import {Meteor} from 'meteor/meteor';
Images.allow({
  insert: function (userId, doc) {
    return true;
  },
  update: function (userId, doc) {
    return true;
  },
  remove: function (userId, doc) {
    return true;
  },
  download: function(userId, fileObj) {
    return true
  }
});
