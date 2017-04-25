import {Posts} from '../lib/collections/posts';
import {Categories} from '../lib/collections/categories';
import {Votes} from '../lib/collections/votes';
import {ListCollection} from '../lib/collections/collection';

Meteor.publish('user', function () {
  return [Meteor.users.find({_id: this.userId}, {fields: {profile: 1, slug: 1}}),
  ListCollection.find()]
})

Meteor.publish(null, function (){
  return Meteor.roles.find({})
})

Meteor.publish('posts', function () {
  return Posts.find({});
})

Meteor.publish('categories', function () {
  return Categories.find();
})

// Meteor.publish('votes', function () {
//   return Votes.find();
// })

Meteor.publish('collection',function () {
  return ListCollection.find();
})
