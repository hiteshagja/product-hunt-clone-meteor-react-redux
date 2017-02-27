import {Meteor} from 'meteor/meteor';
import {Posts} from '../collections/posts';
import {ListCollection} from '../collections/collection';

Meteor.methods({
  addnewlist: function (listname,postId) {
    return ListCollection.insert({
      name:listname,
      postId:[postId]
    })
  },
  getlist: function (user) {
    return ListCollection.find({userId:user}).fetch();
  },
  updateList:function(listId,postId) {
    var data =  ListCollection.find({_id:listId}).fetch();
    var postdata = data[0].postId;
    if(postdata.indexOf(postId)==-1){
      return ListCollection.update(listId,{$push:{postId:postId}})
    }else{
      return ListCollection.update(listId,{$pop:{postId:postId}})
    }
  },
  singleListData:function (listId) {
    data = [];
    id =  ListCollection.findOne({slug:listId});
    if(id){
      post = id.postId;
      for (var i = 0; i < post.length; i++) {
        data.push(Posts.findOne({_id:post[i]}));
      }
    }
    return data;
  },
  collectionName:function (categorySulg) {
   categoryName =   ListCollection.findOne({slug:categorySulg});
    if(categoryName){
      return categoryName.name;
    }
  }
})
