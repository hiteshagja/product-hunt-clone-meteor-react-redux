import React, {PropTypes, Component} from 'react';
import {Panel} from 'react-bootstrap';
import PostListingByDay from './postListingByDay';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import {Posts} from '../../../lib/collections/posts';

class PostListing extends Component {
    constructor(props) {
        super(props);
    }

    getDateRange() {
        const mAfter = moment('2017-02-15', 'YYYY-MM-DD');
        const mBefore = moment(new Date(), 'YYYY-MM-DD');
        const daysCount = mBefore.diff(mAfter, 'days') + 1;
        const range = _.range(daysCount).map(i => moment(new Date(), 'YYYY-MM-DD').subtract(i, 'days').startOf('day'));
        return range;
    }

    render() {
        const dates = this.getDateRange();
        if (this.props.Posts.length > 0) {
          return (
            <div>
            {dates.map((date, index) => (<PostListingByDay date={date} posts={this.props.Posts} key={index}/>))}
            </div>
          )
        }
        else {
          return (<div></div>)
        }
    }
}

PostListing.propTypes = {
    // Posts: PropTypes.array.isRequired
};

// const mapTrackerToProps = (state, props) => {
//   if (Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
//     if (Meteor.subscribe('posts', {}).ready()) {
//       return {Posts: Posts.find({}, {sort:{createdAt: -1}}).fetch()};
//     }
//   }
//   else {
//     const condition = {$or: [{userId: Meteor.userId()}, {status: Constant.STATUS.APPROVED}]}
//     if (Meteor.subscribe('posts', condition).ready()) {
//       return {Posts: Posts.find({}, {sort:{createdAt: -1}}).fetch()};
//     }
//   }
//     return {Posts: []};
// };

function mapStateToProps(state, props) {
  // console.log(state.postReducer);
    return {Posts: state.postReducer.post_getAll}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// function mergeProps(stateProps, dispatchProps, ownProps) {
//     return Object.assign({}, ownProps, {
//         Posts: stateProps.Posts,
//         // addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
//     })
// }

export default connect(mapStateToProps, mapDispatchToProps)(PostListing);
