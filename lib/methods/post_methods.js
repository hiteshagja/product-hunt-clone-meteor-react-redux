import {Meteor} from 'meteor/meteor';
import {Posts} from '../collections/posts';
import {Votes} from '../collections/votes';

Meteor.methods({
  insertPost: function (data) {
    return Posts.insert(data);
  },

  updatePost: function (data) {
    return Posts.update(data.postId, {$set: data});
  },

  getAllPost: function () {
    var data = Posts.find().fetch();
    if (Meteor.userId()) {
      data = Posts.find({$or: [{userId: Meteor.userId()}, {status: Constant.STATUS.APPROVED}]}).fetch();
    }
    for (var i = 0; i < data.length; i++) {
      data[i]['votes'] = Votes.find({sourceId: data[i]._id}).count();
    }

    return data;
  },

  getPost: function (postId) {
    return Posts.findOne(postId);
  }
})
