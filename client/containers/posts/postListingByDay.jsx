import React, {PropTypes, Component} from 'react';
import {Panel} from 'react-bootstrap';
import PostItem from '../../containers/posts/postItem';

class PostListingByDay extends Component {
    constructor() {
        super();
        this.checkDate = this.checkDate.bind(this);
    }

    checkDate() {
        if (this.props.category) {
            return this.props.category;
        }
        if (moment(this.props.date).isSame(new Date(), 'day')) {
            return 'Today';
        } else if (moment().subtract(1, 'day').isSame(this.props.date, 'day')) {
            return 'Yesterday';
        } else {
            return this.props.date.format("dddd, MMMM Do YYYY");
        }
    }

    render() {
        let data = this.props.posts;
        const date = this.props.date;
        if (date) {
            const filteredPosts = this.props.posts.filter(function(post) {
                return moment(date).isSame(post.date, 'day');
            })

            if (filteredPosts.length > 0) {
                data = (
                    <Panel className="post-by-day" header={this.checkDate()}>
                        {filteredPosts.map((post, i) => (<PostItem post={post} rebind={this.props.rebind} shortAs={this.props.shortAs} postid={post._id} key={i}/>))}
                    </Panel>
                )
            } else {
                data = ''
            }
        } else {
            if (data.length > 0) {
                data = (
                    <Panel className="post-by-day" header={this.checkDate()}>
                        {data.map((post, i) => (<PostItem post={post} rebind={this.props.rebind} shortAs={this.props.shortAs} postid={post._id} key={i}/>))}
                    </Panel>
                )
            } else {
                data = ''
            }
        }

        return (
            <div>
                {data}
            </div>
        )
    }
}

PostListingByDay.propTypes = {
    date: PropTypes.object,
    posts: PropTypes.array
};

export default PostListingByDay;
