import React, {PropTypes, Component} from 'react';
import {Provider} from 'react-redux';

import store from '../../store';
import MainApp from './MainApp';

class MainLayout extends Component {
  render() {
  return (
    <Provider store={store}>
      <MainApp content={this.props.children}/>
    </Provider>
  )
}
}

// MainLayout.propTypes = {
//   content: PropTypes.func.isRequired
// };

export default MainLayout;
