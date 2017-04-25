import {Mongo} from 'meteor/mongo';

let userSchema = {};

userSchema.profile = new SimpleSchema({
  displayName: {
    type: String,
    optional: true,
  },
  htmlBio: {
    type: String,
    optional: true,
  },
  twitterUsername: {
    type: String,
    optional: true,
  },
  website: {
    type: String,
    regEx: SimpleSchema.RegEx.Url,
    optional: true,
  },
})

userSchema.User = new SimpleSchema({
  username: {
    type: String,
    optional: true,
  },
  emails: {
    type: [Object],
    optional: true,
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: true,
  },
  "emails.$.verified": {
    type: Boolean,
    optional: true,
  },
  createdAt: {
    type: Date,
    optional: true,
  },
  isAdmin: {
    type: Boolean,
    optional: true,
  },
  profile: {
    type: userSchema.profile,
    optional: true,
    blackbox: true
  },
  telescope: {
    type: Object,
    blackbox: true,
    optional: true,
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  bio: {
    type: String,
    optional: true,
  },
  email: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
  },
  emailHash: {
    type: String,
    optional: true,
  },
  karma: {
    type: Number,
    decimal: true,
    optional: true,
  },
  slug: {
    type: String,
    optional: true,
  },
  groups: {
    type: [String],
    optional: true,
  },
  roles: {
    type: String,
    optional: true,
    blackbox: true,
    allowedValues: ['user', 'admin']
  },
  signupFlag: {
    type: Boolean,
    autoValue: function () {
      if (this.isInsert) {
        return true;
      }
    }
  },
  slug: {
    type: String,
    optional: true
  },
});
Meteor.users.attachSchema(userSchema.User);
Meteor.users.friendlySlugs(
  {
    slugFrom: 'profile.name',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);

Meteor.users.after.update(function(userId, doc){
  if (!doc.slug){
    Meteor.users.update(doc._id, {$set: {slug: doc._id}})
  }
})
