import MainLayout from './containers/layout/MainLayout';
import PostListing from './containers/posts/postListing';
import PostDetails from './containers/posts/postDetails';
import collectionList from './containers/listCollection/collectionList';
import collectionPost from './containers/listCollection/collectionPost';
import Profile from './containers/profile/profile';
import Footer from './containers/layout/footer.jsx';
import Login from './containers/layout/login.jsx';


import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import store from './store';
import {Provider} from 'react-redux';

const GetRoutes = () => {
  const authRequired = (nextState, replaceState) => {
    // Now you can access the store object here.
    const state = store.getState();
    if (!localStorage.superAdmin) {
      // Not authenticated, redirect to login.
      replaceState('/login');
    }
  };

  return (
    <Provider store={store}>
      <Router path="/" history={browserHistory}>
        <Route path="/" component={MainLayout}>
          <Route path="login" component={Login} />
          <IndexRoute component={PostListing} onEnter={authRequired} />
          <Route path="/posts/:id/:slug" component={PostDetails} onEnter={authRequired} />
          <Route path="/:id/collection/:collection" component={collectionPost} onEnter={authRequired} />
          <Route path="/:slug" component={Profile} onEnter={authRequired} />
          <Route path="/:slug/collection" component={Profile} onEnter={authRequired} />
          <Route path="/:slug/topics" component={Profile} onEnter={authRequired} />
        </Route>
      </Router>
    </Provider>
  );
}

export default GetRoutes;

// function authenticate(nextState, replace) {
//   if (!Meteor.isSuperUser) {
//     replace('/login');
//   }
// }
//
// const routes = [
//   {
//     path: '/login',
//     component: Login
//   },
//   {
//     path: '/',
//     component: PostListing,
//     onEnter: authenticate
//   },
//   {
//     path: '/posts/:id/:slug',
//     component: PostDetails,
//     onEnter: authenticate
//   },
//   {
//     path: '/:id/collection/:collection',
//     component: collectionPost,
//     onEnter: authenticate
//   },
//   {
//     path: '/:slug',
//     component: Profile,
//     onEnter: authenticate
//   },
//   {
//     path: '/:slug/collection',
//     component: Profile,
//     onEnter: authenticate
//   },
//   {
//     path: '/:slug/topics',
//     component: Profile,
//     onEnter: authenticate
//   }
// ];
//
// export default routes;



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
