import {Meteor} from 'meteor/meteor';
import {Posts} from '../collections/posts';
import {ListCollection} from '../collections/collection';
import {AdminCollections} from '../collections/admin_collections';
import {Images} from '../collections/images';

Meteor.methods({
  addnewlist: function (data) {
    return ListCollection.insert(data);
  },

  updateCollection: function (data) {
    return ListCollection.update(data.id, {$set: data});
  },

  getlist: function (slug) {
    user = Meteor.users.findOne({slug:slug});
    if(user){
      collection = ListCollection.find({userId:user._id}).fetch();
      if(collection.length > 0) {
        for (var i = 0; i < collection.length; i++) {
          var image = Images.findOne(collection[i].image);
          if (image) {
            collection[i]['imagePath'] = 'http://' + this.connection.httpHeaders.host + image.url({brokenIsFine: true});
          }
        }
        return collection;
      }
    }
  },

  updateList:function(listId, postId) {
    var data = ListCollection.findOne(listId);
    if(data && data.postId.indexOf(postId)==-1){
      return ListCollection.update(listId,{$push:{postId:postId}})
    }else{
      return ListCollection.update(listId,{$pop:{postId:postId}})
    }
  },

  singleListData:function (collectionSlug) {
    let data = {};
    collection = ListCollection.findOne({slug: collectionSlug});
    if(collection){
      data.name = collection.name;
      data.author = collection.author;
      data.picture = getUserPicture();
      data.posts = [];
      for (var i = 0; i < collection.postId.length; i++) {
        post = Posts.findOne({_id:collection.postId[i],isDeleted:false,status: Constant.STATUS.APPROVED});
        if(post){
          data.posts.push(post);
        }
      }
      return data;
    }
  },

  collectionName:function (categorySulg) {
    categoryName =   ListCollection.findOne({slug:categorySulg});
    if(categoryName){
      return categoryName.name;
    }
  },

  getAdminCollections: function () {
    var data = ListCollection.find({show: true}).fetch();
    userIsAdmin = false;
    if (Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
      data = ListCollection.find({isAdmin: true}).fetch();
      userIsAdmin = true;
    }
    if (data) {
      for (var i = 0; i < data.length; i++) {
        var image = Images.findOne(data[i].image);
        if (image) {
          data[i]['imagePath'] = 'http://' + this.connection.httpHeaders.host + image.url({brokenIsFine: true,store: 'images'});
        }
        data[i]['userIsAdmin'] = userIsAdmin
        var user = Meteor.users.findOne(data[i].userId);
        if (user) {
          data[i]['userSlug'] = user.slug
        }
      }
    }

    return data.reverse();
  }
})
