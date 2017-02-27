import {Meteor} from 'meteor/meteor';
import {Votes} from '../collections/votes';

Meteor.methods({
  addVote: function (sourceId) {
    var data = Votes.findOne({sourceId: sourceId, userId: Meteor.userId()})
    console.log(data);
    if (data) {
      Votes.remove(data._id)
    }
    else {
      Votes.insert({
        sourceId: sourceId,
        userId: Meteor.userId()
      })
    }
  },

  getVoteCount: function (sourceId) {
    return Votes.find({sourceId: sourceId}).count();
  }
})
