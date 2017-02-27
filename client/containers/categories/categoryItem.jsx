import React, {PropTypes, Component} from 'react';
import {Media} from 'react-bootstrap';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'

import {NavItem, NavDropdown, MenuItem, Link, Glyphicon} from 'react-bootstrap';

import CategoryEdit from './categoryEdit';

class CategoryItem extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(e) {
        e.preventDefault();
        this.props.getAllCategory();
        this.props.getCategory(this.props.category.parentId);
        this.setState({show: true});
    }

    closeModal() {
        this.setState({show: false});
    }

    render() {
        const category = this.props.category;

        if (Object.keys(this.props.parentCategory).length > 0) {
            return (
                <MenuItem value={category._id}>
                    {category.name}
                    <Glyphicon glyph="align-right" value={category._id} onClick={this.openModal}/>
                    <CategoryEdit showModal={this.state.show} category={category} parentCategory={this.props.parentCategory} closeModal={this.closeModal}/>
                </MenuItem>
            )
        } else {
            return (
                <MenuItem value={category._id}>
                    {category.name}
                    <Glyphicon glyph="align-right" value={category._id} onClick={this.openModal}/>

                </MenuItem>
            )
        }
    }
}

CategoryItem.propTypes = {
    category: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {parentCategory: state.categoryReducer.category_get}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
