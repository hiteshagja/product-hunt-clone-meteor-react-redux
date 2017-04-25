import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {Well, Panel,DropdownButton, SplitButton, Dropdown,ButtonToolbar,MenuItem} from 'react-bootstrap';
import PostListingByDay from './postListingByDay';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import {Posts} from '../../../lib/collections/posts';
import AdminCollectionItem from '../listCollection/adminCollectionItem';

class PostListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortAs:'Popularity',
      pageNumber: 1,
      pageSize: 20,
      action: 'rebind'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.props.getAdminCollections();
    this.props.getAllPost(this.state);
    this.props.PostPagingDetail(this.state)
  }

  getDateRange() {
    let range = [];
    let maxDate = _.max(this.props.Posts, function(stooge){ return stooge.date; }).date;
    let minDate = _.min(this.props.Posts, function(stooge){ return stooge.date; }).date;
    if (minDate && maxDate) {
      const mAfter = moment(minDate);
      const mBefore = moment(maxDate);
      const daysCount = mBefore.diff(mAfter, 'days') + 1;
      range = _.range(daysCount).map(i => moment(new Date(maxDate), 'YYYY-MM-DD').subtract(i, 'days').startOf('day'));
    }
    return range;
  }

  handleChange(e){
    this.setState({shortAs:e, pageNumber: 1});
    if(this.props.datetime.category){
      category = this.props.datetime.category
      categoryName = this.props.datetime.categoryName
    }else{
      category = null;
      categoryName = null
    }
    this.props.PostPagingDetail({shortAs: e,category, categoryName, pageNumber: 1})
    this.props.getAllPost({
      shortAs: e,
      category: category,
      pageNumber: 1,
      action: 'rebind'
    });
  }

  handleVoteClick(e) {
    this.props.getAllPost({
      shortAs: e,
      category: this.props.datetime.category,
      pageNumber: this.state.pageNumber,
      action: 'vote'
    });
  }

  handleLoadMore(e){
    this.props.postLoading('loading...');
    let pageNumber = this.props.datetime.pageNumber + 1;

    this.setState({
      numberOfPost: this.state.numberOfPost + 5,
      pageNumber: pageNumber
    });

    // numberofpost = this.state.numberOfPost;
    if(this.props.datetime.category){
      category = this.props.datetime.category;
      categoryName = this.props.datetime.categoryName
    }else{
      category = null;
      categoryName = null
    }
    this.props.PostPagingDetail({shortAs: this.state.shortAs,category, categoryName, pageNumber})
    this.props.getAllPost( {shortAs: this.state.shortAs,category, pageNumber, action: 'append'} );
  }

  render() {
    var shorting = this.props.Posts;
    let adminCollection, panels;
    const dates = this.getDateRange();
    if (this.props.datetime && this.props.datetime.category) {
      panels = (
        <PostListingByDay shortAs={this.state.shortAs} rebind={this.handleVoteClick.bind(this)} posts={shorting} category={this.props.datetime.categoryName} />
      )
    }
    else {
      panels = (
        dates.map((date, index) => (<PostListingByDay date={date} shortAs={this.state.shortAs} rebind={this.handleVoteClick.bind(this)} posts={shorting} category={this.props.datetime.categoryName} key={index}/>))
      )
    }

    if (this.props.admin_collections.length > 0) {
      adminCollection = (this.props.admin_collections.map((collection, index) => (<AdminCollectionItem collection={collection} key={index} />)))
    }

    if (this.props.postCount == 0) {
      noData = (<div><p>No More Data</p></div>)
    }
    else {
      noData = (<a className="loadMore" onClick={this.handleLoadMore.bind(this)}>{this.props.loadingText}</a>)
    }


    return (
      <div>
        <div className="row">
          <div className="col-md-9 scroll" >
            <div className="shortingDropdownList text-right">
              <a className={this.state.shortAs=='Popularity' ? 'active' :  ''} onClick={()=>{this.handleChange('Popularity')}} href="#">Popularity</a>
              {"  |  "}
              <a className={this.state.shortAs=='Popularity' ? '' : 'active'} onClick={()=>{this.handleChange('Newest')}} href="#">Newest</a>
            </div>
            {panels}
            <div className="text-center">
              {noData}
            </div>
          </div>
          <div className="col-md-3">
            <Well className="navbar-default">
              <h4>Similar Collections</h4>
              <hr/>
              {adminCollection}
            </Well>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  Meteor.subscribe('posts');
  return {
    admin_collections: state.adminCollectionReducer.admin_collections,
    Posts:state.postReducer.post_getAll,
    loadingText:state.postReducer.loadingText,
    datetime: state.postReducer.postDateDetail,
    postCount: state.postReducer.postCount
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect( mapStateToProps, mapDispatchToProps)(PostListing);
