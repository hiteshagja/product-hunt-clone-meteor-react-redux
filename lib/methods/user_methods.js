import {Meteor} from 'meteor/meteor';

Meteor.methods({
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
  }
})
