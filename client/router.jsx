import PostListing from './containers/posts/postListing';
import PostDetails from './containers/posts/postDetails';
import collectionList from './containers/listCollection/collectionList';
import collectionPost from './containers/listCollection/collectionPost';
import profile from './containers/profile/profile';
import Footer from './containers/layout/footer.jsx';

const routes = [
  {
    path: '/',
    component: PostListing
  },
  {
    path: '/posts/:id/:slug',
    component: PostDetails
  },
  {
    path: '/:id/collection',
    component: collectionList
  },
  {
    path: '/:id/collection/:collection',
    component: collectionPost
  },
  {
    path: '/:profileName',
    component: profile
  },
  {
    path: '*',
    component: Footer
  }
];

export default routes;



// import React from 'react';
// import {FlowRouter} from 'meteor/kadira:flow-router';
// import {mount} from 'react-mounter';
// import injectTapEventPlugin from 'react-tap-event-plugin';
//
// import MainLayout from './components/layout/MainLayout.jsx';
//
// import PostListing from './containers/posts/postListing.jsx';
//
// injectTapEventPlugin(); // like FastClick
//
// FlowRouter.route('/', {
//   name: 'post_listing',
//   action() {
//     mount(MainLayout, {content: () => <PostListing posts={[]} />});
//   }
// });
