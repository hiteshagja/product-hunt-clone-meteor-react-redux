import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {
    Grid,
    Well,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    Image,
    Panel
} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';
import ProfileCollectionList from './collection';
import PostItem from '../posts/postItem';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.getUserProfile(this.props.params.slug.substr(1));
        this.props.getList(this.props.params.slug.substr(1));
        this.props.getUserPost(this.props.params.slug);
    }

    handleClick(data) {
        browserHistory.push('/@' + this.props.profileUser.slug + data)
    }

    render() {
        let title,
            center,
            username,
            slug,
            picture,
            votedPosts = [],
            upvoteCount;
        const user = this.props.profileUser;

        if (Object.keys(user).length > 0) {
            if (this.props.section_to_load == 'upvotes') {
                title = user.votedPosts.length + ' Upvotes';
                center = user.votedPosts.length > 0
                    ? (user.votedPosts.map((post) => (<PostItem post={post} key={post._id}/>)))
                    : (
                        <div className="text-center">
                            <span style={{
                                color: "#999"
                            }}>No upvotes yet.</span>
                        </div>
                    )
            }
            if (this.props.section_to_load == 'topics') {
                title = this.props.user_post.length + ' Topics'
                center = this.props.user_post.length > 0
                    ? (this.props.user_post.map((post) => (<PostItem post={post} key={post._id}/>)))
                    : (
                        <div className="text-center">
                            <span style={{
                                color: "#999"
                            }}>No topics yet.</span>
                        </div>
                    )
            }
            if (this.props.section_to_load == 'collection') {
                title = this.props.data.length + ' Collections Made'
                center = this.props.data.length > 0
                    ? (<div>{this.props.data.map((data, index) => (<ProfileCollectionList data={data} key={index} slug={this.props.profileUser.slug} />))}</div>)
                    : (
                        <div className="text-center">
                            <span style={{
                                color: "#999"
                            }}>No collections yet.</span>
                        </div>
                    );
            }
            upvoteCount = user.votedPosts.length;
            picture = user.picture;
            username = (
                <h2>{user.profile.name}</h2>
            );
            slug = (
                <h4>@{user.slug}</h4>
            );
        }

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <Well className="user-profile">
                            <div className="profilePicture">
                                <Image src={picture} width={140} height={140} circle/>
                            </div>
                            <div>
                                {username}
                                {slug}
                            </div>
                        </Well>
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <div className="left-side">
                            <p>
                                <a onClick={() => {
                                    this.handleClick('')
                                }} className={this.props.section_to_load == 'upvotes'
                                    ? "Active"
                                    : " "}>{upvoteCount} {' '}
                                    Upvotes</a>
                            </p>
                            <p>
                                <a onClick={() => {
                                    this.handleClick('/topics')
                                }} className={this.props.section_to_load == 'topics'
                                    ? "Active"
                                    : " "}>{this.props.user_post.length} {' '} Topics</a>
                            </p>
                            <p>
                                <a  onClick={() => {
                                    this.handleClick('/collection')
                                }} className={this.props.section_to_load == 'collection'
                                    ? "Active"
                                    : ""}>{this.props.data.length} {' '}
                                    Collections Made</a>
                            </p>
                        </div>
                    </Col>
                    <Col md={10}>
                        <Panel>
                            <h4>{title}</h4>
                            <hr/> {center}
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state, props) {
    let path = props.route.path.substring(props.route.path.lastIndexOf('/') + 1);
    let section = path == ':slug'
        ? 'upvotes'
        : path;
    return {section_to_load: section, profileUser: state.userReducer.user_profile, data: state.listtoggle.list_data, user_post: state.postReducer.user_post}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
