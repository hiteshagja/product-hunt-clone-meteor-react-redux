import {Posts} from '../lib/collections/posts';
import {Categories} from '../lib/collections/categories';
import {Votes} from '../lib/collections/votes';
import {ListCollection} from '../lib/collections/collection';

Meteor.publish('users', function () {
  return Meteor.users.find();
})

Meteor.publish(null, function (){
  return Meteor.roles.find({})
})

Meteor.publish('posts', function (condition) {
  condition['isDeleted'] = false;
  return Posts.find(condition);
})

Meteor.publish('categories', function () {
  return Categories.find();
})

Meteor.publish('votes', function () {
  return Votes.find();
})

Meteor.publish('collection',function () {
  return ListCollection.find();
})
