import React, {Component} from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import SignIn from './signIn';
import PostAdd from '../../containers/posts/postAdd';
import CategoryListing from '../../containers/categories/categoryListing';
import CategoryScrollView from '../../containers/categories/categoryScrollView';
import {connect} from 'react-redux-meteor'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import {Link, browserHistory} from 'react-router';

class Header extends Component {
    constructor() {
        super();
        this.addPost = this.addPost.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleProfileClick = this.handleProfileClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault()
        name = Meteor.user().profile.name;
        browserHistory.push('/@' + name + '/collection');
    }
    handleProfileClick(e){
      e.preventDefault()
      name = Meteor.user().profile.name;
      browserHistory.push('/@'+name);
    }
    addPost(e) {
        e.preventDefault();
        if (this.props.userId) {
            this.props.togglePostModal(true);
            this.props.getAllCategory();
        } else {
            this.props.toggleSignInModal(true);
        }
    }

    render() {
        let signInLink,
            categoryList,
            list,
            categories, profile;

        let navStyle = {
            border: 'none',
            borderBottom: '1px solid #e0e0e0'
        }

        if (this.props.userId) {
            signInLink = <NavItem eventKey={4} onClick={() => (this.props.signOut())}>Logout</NavItem>
            list = <NavItem onClick={this.handleClick} eventKey={4} >My Collection</NavItem>
            profile = <NavItem onClick={this.handleProfileClick} eventKey={4} >Profile</NavItem>
        } else {
            signInLink = <NavItem eventKey={3} onClick={() => (this.props.toggleSignInModal(true))}>Login</NavItem>
        }

        if (this.props.role === Constant.ROLES.ADMIN) {
            categoryList = <CategoryListing/>;
        }
        if (this.props.categories.length > 0) {
            categories = <CategoryScrollView categories={this.props.categories}/>
        }

        return (
            <div>
                <Navbar style={navStyle}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Product Hunt</a>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                          <NavItem href="/">
                              Home
                          </NavItem>
                            {categoryList}
                            {list}
                            <NavItem eventKey={2} onClick={this.addPost}>Post</NavItem>
                            {profile}
                            {signInLink}
                        </Nav>
                    </Navbar.Collapse>
                    {categories}
                </Navbar>

                <SignIn/>
                <PostAdd showPostModal={this.props.showPostModal} category={{}}/>
            </div>
        )
    }
}

const mapTrackerToProps = (state, props) => {
    if (Meteor.user() && Meteor.user().roles) {
        return {
            role: Meteor.user().roles[Constant.ROLES.GROUP][0]
        }
    }
    return {role: Constant.ROLES.USER}
};

function mapStateToProps(state, props) {
    return {userId: state.signInReducer.userId, role: state.signInReducer.role, categories: state.categoryReducer.category_getAll}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
    return Object.assign({}, ownProps, {
        role: stateProps.role,
        userId: dispatchProps.userId,
        categories: dispatchProps.categories
    })
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps, mergeProps)(Header);
