import {Meteor} from 'meteor/meteor';
import {Votes} from '../collections/votes';
import {Posts} from '../collections/posts';
import {SuperUser} from '../collections/superUser';

Meteor.methods({
  superUserCheck: function (data) {
    return SuperUser.find({email: data.email, password: data.password}).fetch();
  },

  assignRoleToUser: function () {
    if (Meteor.user() && Meteor.user().signupFlag) {
      if (Meteor.users.find().count() == 1) {
        Roles.addUsersToRoles(Meteor.userId(), ['admin'], 'default-group');
      }
      else {
        Roles.addUsersToRoles(Meteor.userId(), ['user'], 'default-group');
      }
      Meteor.users.update(Meteor.userId, {$set: {signupFlag: false}});
    }
  },

  getCurrentUser: function () {
    var user = Meteor.user()
    if (user) {
      user['picture'] = getUserPicture();
      user['votedPosts'] = [];
      var voteData = Votes.find({userId: user._id}).fetch();
      for (var i = 0; i < voteData.length; i++) {
        var post = Posts.findOne(voteData[i].sourceId);
        if (post) {
          user.votedPosts.push(post);
        }
      }
      return user;
    };
  },
  getUserProfile: function (slug) {
    var user = Meteor.users.findOne({slug:slug});
    if (user) {
      user['picture'] = getUserPicture(user._id);
      user['votedPosts'] = [];
      var voteData = Votes.find({userId: user._id}).fetch();
      for (var i = 0; i < voteData.length; i++) {
        var post = Posts.findOne(voteData[i].sourceId);
        if (post) {
          user.votedPosts.push(post);
        }
      }
      return user;
    };
  }
})

getUserPicture = function (id) {
  var user;

  if(id){
     user = Meteor.users.findOne({_id:id});
  }else{
     user = Meteor.user();
  }

  if (user && user.services) {
    if (user.services.facebook) {
      return 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?width=150&height=150';
    }
    else if (user.services.twitter) {
      return 'https://twitter.com/' + user.services.twitter.screenName + '/profile_image?size=original';
    }
  }
}
