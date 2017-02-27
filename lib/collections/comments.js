import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Comments = new Mongo.Collection('comments');

let commentSchema = {};

commentSchema.Comments = new SimpleSchema({
  parentCommentId: {
    type: String,
    optional: true,
  },
  topLevelCommentId: {
    type: String,
    optional: true,
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) return new Date();
    }
  },
  postedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) { return new Date() }
    }
  },
  body: {
    type: String,
    max: 3000,
    optional: true
  },
  htmlBody: {
    type: String,
    optional: true,
  },
  author: {
    type: String,
    optional: true,
    autoValue: function () {
      if (this.isInsert) { return Meteor.user().profile.name; }
    }
  },
  inactive: {
    type: Boolean,
    optional: true,
  },
  postId: {
    type: String,
    optional: true,
    max: 500,
  },
  userId: {
    type: String,
    optional: true,
    autoValue: function () {
      if (this.isInsert) { return Meteor.userId(); }
    }
  },
  isDeleted: {
    type: Boolean,
    optional: true,
  },
  userIP: {
    type: String,
    optional: true,
  },
  userAgent: {
    type: String,
    optional: true,
  },
  referrer: {
    type: String,
    optional: true,
  }
});

Comments.attachSchema(commentSchema.Comments);
