import { Meteor } from 'meteor/meteor';

import React from 'react';
import { Router, browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { createHistory, useBasename } from 'history';

import routes from './router.jsx';
import MainLayout from './containers/layout/MainLayout.jsx';

import store from './store';
import {Provider} from 'react-redux';

const rootRoute = {
  component: MainLayout,
  childRoutes: routes,
};

Meteor.startup(() => {
  ReactDOM.render(
    <Router history={browserHistory} routes={rootRoute} />,
    document.getElementById('root')
  );
});
