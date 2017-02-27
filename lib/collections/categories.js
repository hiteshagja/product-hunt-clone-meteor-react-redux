import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Categories = new Mongo.Collection('categories');

let categorySchema = {};

categorySchema.Categories = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  order: {
    type: Number,
    optional: true
  },
  slug: {
    type: String,
    optional: true
  },
  image: {
    type: String,
    optional: true
  },
  parentId: {
    type: String,
    optional: true
  }
})

Categories.attachSchema(categorySchema.Categories);

Categories.friendlySlugs(
  {
    slugFrom: 'name',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);
