import {Meteor} from 'meteor/meteor';
import {Votes} from '../collections/votes';
import {Posts} from '../collections/posts';
import {Comments} from '../collections/comments';

Meteor.methods({
  addVote: function (sourceId) {
    var data = Votes.findOne({sourceId: sourceId, userId: Meteor.userId()})
    if (data) {
      Votes.remove(data._id, function (err, res) {
        if (!err) {
          Posts.update(sourceId, {$set: {votes: Votes.find({sourceId: sourceId}).count()}});
          Comments.update(sourceId, {$set: {votes: Votes.find({sourceId: sourceId}).count()}});
        }
      })
    }
    else {
      Votes.insert({
        sourceId: sourceId,
        userId: Meteor.userId()
      }, function (err, res) {
        if (!err) {
          Posts.update(sourceId, {$set: {votes: Votes.find({sourceId: sourceId}).count()}});
          Comments.update(sourceId, {$set: {votes: Votes.find({sourceId: sourceId}).count()}});
        }
      })
    }
  },

  getVoteCount: function (sourceId) {
    return Votes.find({sourceId: sourceId}).count();
  }
})
