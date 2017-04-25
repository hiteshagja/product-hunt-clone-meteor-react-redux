import { Meteor } from 'meteor/meteor';

import React from 'react';
import ReactDOM from 'react-dom';

import GetRoutes from './router.jsx';

Meteor.startup(() => {
  ReactDOM.render(
    <GetRoutes />,
    document.getElementById('root')
  );
});
