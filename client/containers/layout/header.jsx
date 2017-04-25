import React, {Component} from 'react';
import {
  Nav,
  Navbar,
  NavItem,
  NavDropdown,
  MenuItem,
  Image
} from 'react-bootstrap';
import SignIn from './signIn';
import PostAdd from '../../containers/posts/postAdd';
import CategoryListing from '../../containers/categories/categoryListing';
import CategoryScrollView from '../../containers/categories/categoryScrollView';
import {connect} from 'react-redux-meteor'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import {Link, browserHistory} from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);
    this.addPost = this.addPost.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
    this.handleProfileClick = this.handleProfileClick.bind(this);
    this.handleAdminSignOut = this.handleAdminSignOut.bind(this);
    props.getCurrentUser();
  }

  handleClick(e) {
    e.preventDefault()
    let slug = Meteor.user().slug
    this.props.getUserProfile(slug);
    this.props.getList(slug);
    this.props.getUserPost(slug);
    browserHistory.push('/@' + slug + '/collection');
  }

  handleHomeClick(e) {
    e.preventDefault();
    browserHistory.push('/');
  }

  handleSignout(e) {
    e.preventDefault();
    browserHistory.push('/');
    this.props.signOut(() => {
      this.props.PostPagingDetail({shortAs: 'Popularity', pageNumber: 1, action: 'rebind'});
      this.props.getAllPost({shortAs: 'Popularity', pageNumber: 1, action: 'rebind'});
      this.props.getCurrentUser();
      this.props.getAdminCollections();
    });
  }

  handleAdminSignOut(e) {
    this.props.getCurrentUser();
    localStorage.superAdmin = '';
    browserHistory.push('/login');
  }

  handleProfileClick(e) {
    e.preventDefault()
    let slug = Meteor.user().slug;
    if (slug) {
      console.log(['user::', slug, Meteor.user()]);
      this.props.getUserProfile(slug);
      this.props.getList(slug);
      this.props.getUserPost(slug);
      browserHistory.push('/@' + slug);
    } else {
      console.log(['error:', slug, Meteor.user()]);
    }

  }
  addPost(e) {
    e.preventDefault();
    if (Meteor.userId()) {
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
    categories,
    profile,
    collection,
    userName,
    userPic,
    home,
    signOut;

    let navStyle = {
      border: 'none',
      borderBottom: '1px solid #e0e0e0'
    }

    if (localStorage.superAdmin) {
      if (Meteor.userId() && this.props.user && Object.keys(this.props.user).length > 0) {
        let name = 'name'
        userPic = (
          <span><Image width={20} height={20} src={this.props.user.picture} circle/>{' '}{this.props.user.profile.name}</span>
        )
        userName = (
          <NavDropdown eventKey="4" title={userPic} id="nav-dropdown">
            <MenuItem eventKey="4.1" onClick={this.handleProfileClick}>Profile</MenuItem>
            <MenuItem eventKey="4.2" onClick={this.handleClick}>My Collection</MenuItem>
            <MenuItem eventKey="4.3" onClick={this.addPost}>Post</MenuItem>
            <MenuItem divider/>
            <MenuItem eventKey="4.4" onClick={this.handleSignout}>Logout</MenuItem>
          </NavDropdown>
        )
      } else {
        signInLink = <NavItem eventKey={4} onClick={() => (this.props.toggleSignInModal(true))}>Login</NavItem>
      }
      home = <NavItem eventKey={3} onClick={this.handleHomeClick}>Home</NavItem>
      signOut = <NavItem eventKey={5} onClick={this.handleAdminSignOut}>Logout</NavItem>

      if (this.props.role === Constant.ROLES.ADMIN) {
        categoryList = <CategoryListing categories={this.props.categories}/>;
      }
      if (this.props.categories.length > 0 && window.location.pathname == '/') {
        categories = <CategoryScrollView getAllPost={this.props.getAllPost} datetime={this.props.datetime} PostPagingDetail={this.props.PostPagingDetail} categories={this.props.categories}/>
      }
    }

    return (
      <div>
        <Navbar style={navStyle}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#" onClick={this.handleHomeClick}>Infinito</a>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {home}
              {categoryList}
              {signInLink}
              {userName}
              {signOut}
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
  Meteor.subscribe('user')
  Meteor.subscribe('categories')
  if (Meteor.user() && Meteor.user().roles) {
    return {
      role: Meteor.user().roles[Constant.ROLES.GROUP][0]
    }
  }
  return {role: Constant.ROLES.USER}
};

function mapStateToProps(state, props) {
  return {user: state.userReducer.current_user, role: state.signInReducer.role, categories: state.categoryReducer.category_getAll, datetime: state.postReducer.postDateDetail}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    role: stateProps.role,
    user: dispatchProps.user,
    categories: dispatchProps.categories,
    datetime: dispatchProps.datetime
  })
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps, mergeProps)(Header);
