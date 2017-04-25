import {Meteor} from 'meteor/meteor';
import {Comments} from '../collections/comments';
import {Posts} from '../collections/posts';

Meteor.methods({
  addComment: function (data) {
    return Comments.insert(data, function (err, res) {
      if (!err) {
        Posts.update(data.postId, {$set: {comments: Comments.find({postId: data.postId}).count()}});
      }
    });
  },

  updateComment: function (data) {
    return Comments.update(data.commentId, {$set: {data}});
  },

  getPostComments: function (postId) {
    return postComments({postId: postId, parentCommentId: {$exists: false}});
  },

  getCommentCount: function (postId) {
    return Comments.find({postId: postId}).count();
  }
})


function postComments(condition) {
  let arrComments = [];
  Comments.find(condition).fetch().map(function (comment) {
    var user = Meteor.users.findOne(comment.userId);

    if (user && user.services) {
      if (user.services.facebook) {
        comment['picture'] = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?width=150&height=150';
      }
      else {
        comment['picture'] = 'https://twitter.com/' + user.services.twitter.screenName + '/profile_image?size=original';
      }
    }

    comment['replies'] = postComments({parentCommentId: comment._id})
    arrComments.push(comment)
  })
  return arrComments;
}
