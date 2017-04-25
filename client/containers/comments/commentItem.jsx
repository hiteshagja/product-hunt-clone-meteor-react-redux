import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import CommentAddReply from './commentAddReply';
import CommentReplies from './commentReplies';
import TimeAgo from 'react-timeago';
import {
    Row,
    Col,
    Well,
    Media,
    Image,
    Button,
    FormGroup,
    FormControl
} from 'react-bootstrap';

class CommentItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showReplyBlock: false
        }
        this.showReplyBlock = this.showReplyBlock.bind(this);
        this.closeReplyBlock = this.closeReplyBlock.bind(this);
        this.handleVoteClick = this.handleVoteClick.bind(this);
    }

    showReplyBlock(e) {
        e.preventDefault();
        if (Meteor.userId()) {
            this.setState({showReplyBlock: true});
        } else {
            this.props.toggleSignInModal(true);
        }
    }

    closeReplyBlock() {
        this.setState({showReplyBlock: false});
    }

    handleVoteClick(e) {
        e.preventDefault();
        self = this;
        if (Meteor.userId()) {
            self.props.vote(this.props.data._id, function(err, res) {
                self.props.getPostComments(self.props.data.postId);
            });
        } else {
            self.props.toggleSignInModal(true);
        }
    }

    render() {
        const {data} = this.props;
        let replyButton,
            voteButton,
            replyBlock,
            commentReplies,
            time;

        replyButton = <Button bsStyle="link" onClick={this.showReplyBlock}>
            <i className="fa fa-reply" aria-hidden="true"></i>&nbsp; Reply</Button>

        voteButton = (
            <Button bsSize="xs" onClick={this.handleVoteClick}>
                <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;{data.votes}</Button>
        )

        if (this.state.showReplyBlock) {
            replyBlock = <CommentAddReply commentData={data} closeBlock={this.closeReplyBlock}/>
        }

        if (data.replies.length > 0) {
            commentReplies = <CommentReplies replies={data.replies}/>
        }

        return (
            <div>
                <Well className="comment-item">
                    <Row>
                        <Col md={12}>
                            <Media>
                                <Media.Left>
                                    <Image width={20} height={20} src={data.picture} circle/>
                                </Media.Left>
                                <Media.Body>
                                    <div>
                                        <a href="#">{data.author}</a>
                                        &nbsp; &nbsp;
                                        <span style={{
                                            color: 'grey'
                                        }}><TimeAgo date={data.createdAt}/></span>
                                        &nbsp;
                                    </div>
                                </Media.Body>
                            </Media>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col md={12}>
                            <p>{data.body}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {replyButton}
                            {voteButton}
                        </Col>
                    </Row>
                </Well>
                {replyBlock}
                {commentReplies}
                <br/>
            </div>
        )
    }
}

CommentItem.propTypes = {
    data: PropTypes.object
}

function mapStateToProps(state) {
    return {userId: state.signInReducer.userId}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentItem);
