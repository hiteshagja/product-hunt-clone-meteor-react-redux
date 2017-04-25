import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const AdminCollections = new Mongo.Collection('adminCollections');

let collectionSchema = {};

collectionSchema.AdminCollections = new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
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
  show: {
    type: Boolean
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

AdminCollections.attachSchema(collectionSchema.AdminCollections)
AdminCollections.friendlySlugs(
  {
    slugFrom: 'name',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);
