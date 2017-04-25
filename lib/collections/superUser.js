import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const SuperUser = new Mongo.Collection('superUser');

let collectionSchema = {};

collectionSchema.SuperUser = new SimpleSchema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function(){
      if (this.isInsert) return new Date();
    }
  }
})

SuperUser.attachSchema(collectionSchema.SuperUser)
