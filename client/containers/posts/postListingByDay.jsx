import React, {PropTypes, Component} from 'react';
import {Panel} from 'react-bootstrap';
import PostItem from '../../containers/posts/postItem';

class PostListingByDay extends Component {
  constructor() {
    super();
    this.checkDate = this.checkDate.bind(this);
  }

  checkDate() {
    if (moment(this.props.date).isSame(new Date(), 'day')) {
      return 'Today';
    }
    else if (moment().subtract(1, 'day').isSame(this.props.date, 'day')) {
      return 'Yesterday';
    }
    else {
      return this.props.date.format("dddd, MMMM Do YYYY");
    }
  }

  render() {
    // console.log(date);
    const date = this.props.date;
    const filteredPosts = this.props.posts.filter(function(post) {
        return moment(date).isSame(post.createdAt, 'day');
    })
    return (
        <div>
            <Panel className="post-by-day" header={this.checkDate()}>
                {filteredPosts.map((post) => (<PostItem post={post} key={post._id}/>))}
            </Panel>
        </div>
    )
  }
}

PostListingByDay.propTypes = {
    date: PropTypes.object,
    posts: PropTypes.array
};

export default PostListingByDay;
