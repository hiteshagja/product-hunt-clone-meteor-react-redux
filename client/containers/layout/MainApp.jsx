import React, {PropTypes, Component} from 'react';
import Header from '../../containers/layout/header';
import Footer from './footer';
import CategoryListing from '../../containers/categories/categoryListing';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';

class MainApp extends Component {
    componentWillMount() {
        this.props.getAllCategory();
        this.props.getAllPost();
    }

    render() {
        const wrapperStyle = {
            backgroundColor: "#f9f9f9"
        }

        return (
            <div className="wrapper">
                <div className="header-wrapper">
                    <Header/>
                </div>
                <div className="main container">
                    <div className="row">
                        {this.props.content}
                    </div>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
