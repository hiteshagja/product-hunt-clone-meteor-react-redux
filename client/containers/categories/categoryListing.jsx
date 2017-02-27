import React, {PropTypes, Component} from 'react';
import {Panel} from 'react-bootstrap';
import {connect} from 'react-redux-meteor'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import {Categories} from '../../../lib/collections/categories';
import CategoryItem from './categoryItem'
import CategoryAdd from '../categories/categoryAdd.jsx';

import {NavItem, NavDropdown, MenuItem, Link, Glyphicon} from 'react-bootstrap';

class CategoryListing extends Component {
  constructor() {
    super();
    this.addCategory = this.addCategory.bind(this);
  }

  addCategory(e) {
    e.preventDefault();
    this.props.getAllCategory();
    this.props.toggleCategoryModal(true);
  }
    render() {
        return (
            <NavDropdown title="Category" id="nav-dropdown">
                {this.props.categories.map((category) => (
                    <CategoryItem key={category._id} category={category} />
                ))}
                <MenuItem key="add" className="text-info" onClick={this.addCategory}>Add</MenuItem>
                <CategoryAdd showCategoryModal={this.props.showCategoryModal}/>
            </NavDropdown>
        )
    }
}

const mapTrackerToProps = (state, props) => {
    if (Meteor.subscribe('categories').ready()) {
        return {categories: Categories.find().fetch()};
    }
    return {categories: []};
};

function mapStateToProps(state, props) {
    return {showCategoryModal: state.categoryReducer.category_toggle};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, {
        categories: stateProps.categories,
    })
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps, mergeProps)(CategoryListing);
