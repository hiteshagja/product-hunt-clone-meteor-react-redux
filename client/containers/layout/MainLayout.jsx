import React, {PropTypes, Component} from 'react';
import MainApp from './MainApp';

class MainLayout extends Component {
    render() {
        return (<MainApp content={this.props.children}/>)
    }
}

export default MainLayout;
