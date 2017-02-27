import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Votes = new Mongo.Collection('votes');

let voteSchema = {};

voteSchema.Votes = new SimpleSchema({
  sourceId: {
    type: String
  },
  userId: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
})

Votes.attachSchema(voteSchema.Votes);
