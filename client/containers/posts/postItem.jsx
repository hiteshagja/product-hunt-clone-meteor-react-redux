import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import {Media, Label, Button} from 'react-bootstrap';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import PostEdit from '../../containers/posts/postEdit';
import ListModel from '../listCollection/listModel';
import {browserHistory} from 'react-router';


class PostItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            listShow: false,
            votes:props.post.votes,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.trimDescription = this.trimDescription.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.closeListModal = this.closeListModal.bind(this);
        this.handleVoteClick = this.handleVoteClick.bind(this);
        this.handleCommentClick = this.handleCommentClick.bind(this);
    }

    openModal(e) {
        e.preventDefault();
        this.setState({show: true});
        this.props.getAllCategory();
    }
    handleSave() {
        if (Meteor.userId()) {
            this.props.getList(Meteor.user().slug);
            this.setState({listShow: true});
        } else {
            this.props.toggleSignInModal(true);
        }
    }
    closeModal() {
        this.setState({show: false});
    }
    closeListModal() {
        this.setState({listShow: false});
    }

    trimDescription() {
        return this.props.post.body.substring(0, 100);
    }

    handleVoteClick(e) {
        e.preventDefault();
        self = this;
        if (Meteor.userId()) {
            this.props.vote(this.props.post._id, function() {
                self.props.getVoteCount(self.props.post._id,function (data) {
                  self.setState({votes:data});
                  if(self.props.rebind){
                    self.props.rebind(self.props.shortAs);
                  }
                });
            });
        } else {
            this.props.toggleSignInModal(true);
        }
    }

    handleCommentClick(e) {
        e.preventDefault();
        browserHistory.push('/posts/' + this.props.post._id + '/' + this.props.post.slug);
    }

    render() {
        const {post} = this.props
        if (Object.keys(post).length > 0) {
            let image,
                status,
                voteButton,
                commentCount,
                editLink,
                url = '/posts/' + post._id + '/' + post.slug,
                description = post.body
                    ? post.body.substring(0, 200)
                    : '';
            if (Meteor.userId() === post.userId || Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
                editLink = (
                    <Button bsSize="xs" onClick={this.openModal}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;</Button>
                )
            }

            voteButton = (
                <Button bsSize="xs" onClick={this.handleVoteClick}>
                    <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;{post.votes}</Button>
            )

            commentCount = (
                <Button bsSize="xs" onClick={this.handleCommentClick}>
                    <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;{post.comments}</Button>
            )

            var listButton = (
                <Button onClick={this.handleSave} bsSize="xs">Save</Button>
            )
            if (post.imageUrl) {
                image = <img width={100} height={100} src={post.imageUrl}/>
            }
            if (post.status == Constant.STATUS.PENDING) {
                status = <Label bsStyle="warning">{post.status}</Label>
            }
            return (
                <div className={this.props.postid}>
                    <Media>
                        <Media.Left>
                            {image}
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>
                                <Link to={url}>{post.title}</Link>
                            </Media.Heading>
                            <p>{description}</p>
                            <p>{post.author}</p>
                            {voteButton}
                            &nbsp;
                            {commentCount}
                            &nbsp; {listButton}
                            &nbsp;
                            <Button bsSize="xs">
                                <Link to={post.url} target="_blank">
                                    <i className="fa fa-external-link" aria-hidden="true"></i>
                                </Link>
                            </Button>
                            &nbsp; {editLink}
                            &nbsp; {status}
                        </Media.Body>
                    </Media>
                    <hr/>
                    <PostEdit showModal={this.state.show} post={post} closeModal={this.closeModal}/>
                    <ListModel showModal={this.state.listShow} post={post} closeListModal={this.closeListModal}/>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {categories: state.categoryReducer.category_getAll}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
