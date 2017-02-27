import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const ListCollection = new Mongo.Collection('collection');

let collectionSchema = {};

collectionSchema.ListCollection = new SimpleSchema({
  name: {
    type: String
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
