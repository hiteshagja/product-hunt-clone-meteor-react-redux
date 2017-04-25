import { Meteor } from 'meteor/meteor';
import { SuperUser } from '../lib/collections/superUser';
import { Posts } from '../lib/collections/posts';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.settings.public['embedlyApiKey'] = "08a9127f20b341cb86a856b5d7221640";

  if (SuperUser.find().count() == 0) {
    SuperUser.insert({
      email: 'admin@gmail.com',
      password: "admin",
      name: 'Super Admin'
    });
  }

  Posts.find().fetch().map(function (post) {
    Posts.update(post._id, {$set: {date: new Date(moment(post.createdAt).format('YYYY-MM-DD'))}})
  })
});
