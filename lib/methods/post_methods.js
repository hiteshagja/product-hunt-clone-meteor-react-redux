import {Meteor} from 'meteor/meteor';
import {Posts} from '../collections/posts';
import {Votes} from '../collections/votes';
import {Images} from '../collections/images';


Meteor.methods({
  insertPost: function (data) {
    var id = Posts.insert(data);
    return Posts.find({_id: id}).fetch();
  },

  updatePost: function (data) {
    return Posts.update(data.postId, {$set: data});
  },

  getAllPost: function (data) {
    var pageSize = 20,
    filter = {}, condition = {},
    skip = data.action == 'vote' ? 0 : (data.pageNumber - 1) * pageSize,
    limit = data.action == 'vote' ? (data.pageNumber * pageSize) : pageSize;

    if (Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
      condition = {isDeleted:false};
    }else{
      condition = {$or:[ { userId:Meteor.userId()},{status: Constant.STATUS.APPROVED} ], isDeleted:false};
    }

    if(data.category){
      condition["categoryId"] = data.category;
    }

    if (data.shortAs == 'Newest') {
      filter = {sort:{'createdAt': -1}, skip: skip, limit: limit};
    }
    else {
      filter = {sort:{'votes': -1, 'date': -1}, skip: skip, limit: limit};
    }

    return Posts.find(condition,filter).fetch();
  },

  getPost: function (postId) {
    var self = this;
    var post = Posts.findOne(postId);
    var imageUrl=[]
    if (post) {
      post.images.forEach(function (data,index) {
        var  image =  Images.findOne({_id:data});
        path = 'http://' +self.connection.httpHeaders.host + image.url({store: 'images'});
        imageUrl.push(path);
      })
      post.postImagesUrl = imageUrl;
      return post;
    }
  },

  getUserPost: function (slug) {
    var user = Meteor.users.findOne({slug:slug.substr(1)});
    if (user) {
      return Posts.find({isDeleted:false,userId: user._id}).fetch();
    }
    return [];
  }
})
