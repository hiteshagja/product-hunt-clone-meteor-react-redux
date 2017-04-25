import {Mongo} from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');

let postSchema = {};

postSchema.Posts = {
  createdAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  postedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
    }
  },
  url: {
    type: String,
    optional: true,
  },
  title: {
    type: String,
    optional: false,
  },
  slug: {
    type: String,
    optional: true,
  },
  body: {
    type: String
  },
  htmlBody: {
    type: String,
    optional: true,
  },
  excerpt: {
    type: String,
    optional: true,
  },
  viewCount: {
    type: Number,
    optional: true,
  },
  lastCommentedAt: {
    type: Date,
    optional: true,
  },
  clickCount: {
    type: Number,
    optional: true,
  },
  status: {
    type: String,
    optional: true
  },
  isFuture: {
    type: Boolean,
    optional: true,
  },
  sticky: {
    type: Boolean,
    optional: true,
  },
  inactive: {
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
  },
  author: {
    type: String,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.user().profile.name;
      }
    }
  },
  userId: {
    type: String,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId()
      }
    }
  },
  imageUrl: {
    type: String,
    optional: true
  },
  images: {
    type: [String],
    label: "Images",
    optional: true
  },
  categoryId: {
    type: [String],
    label: "Category"
  },
  isDeleted: {
    type: Boolean,
    optional: true,
    autoValue: function () {
      if (this.isInsert) {
        return false;
      }
    }
  },
  votes: {
    type: Number,
    autoValue: function () {
      if (this.isInsert) {
        return 0;
      }
    }
  },
  comments: {
    type: Number,
    autoValue: function () {
      if (this.isInsert) {
        return 0;
      }
    }
  },
  date: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date(moment().format('YYYY-MM-DD'));
      }
    }
  }
};

Posts.attachSchema(postSchema.Posts);

Posts.friendlySlugs(
  {
    slugFrom: 'title',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);
