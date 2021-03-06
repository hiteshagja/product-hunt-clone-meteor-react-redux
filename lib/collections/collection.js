import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ListCollection = new Mongo.Collection('collection');

let collectionSchema = {};

collectionSchema.ListCollection = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String,
    optional: true
  },
  image: {
    type: String,
    optional: true
  },
  show: {
    type: Boolean
  },
  userId: {
    type: String,
    autoValue: function() {
      if (this.isInsert) return Meteor.userId();
    }
  },
  postId:{
    type: [String],
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function(){
      if (this.isInsert) return new Date();
    }
  },
  slug: {
    type: String,
    optional: true
  },
  author: {
    type: String,
    optional: true,
    autoValue: function() {
      if (this.isInsert) return Meteor.user().profile.name;
    }
  },
  isAdmin: {
    type: Boolean,
    autoValue: function () {
      if (this.isInsert) {
        return Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP);
      }
    }
  }
})

ListCollection.attachSchema(collectionSchema.ListCollection)
ListCollection.friendlySlugs(
  {
    slugFrom: 'name',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);
