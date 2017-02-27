import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {Row, Col, FormControl, FormGroup, Button} from 'react-bootstrap';

class CommentReply extends Component {
    constructor() {
        super();
        this.addComment = this.addComment.bind(this);
    }

    addComment(e) {
        e.preventDefault();
        let commentObj = {
            body: ReactDOM.findDOMNode(this.refs.txtComment).value,
            postId: this.props.commentData.postId,
            parentCommentId: this.props.commentData._id
        }

        this.props.addComment(commentObj);
        this.props.getPostComments(this.props.commentData.postId);
        ReactDOM.findDOMNode(this.refs.txtComment).value = '';
        this.props.closeBlock();
    }

    render() {
        return (
            <Row>
                <Col md={10} mdOffset={1}>
                    <Row>
                        <Col md={12}>
                            <FormGroup controlId="formControlsTextarea">
                                <FormControl ref="txtComment" componentClass="textarea" placeholder="textarea"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button bsStyle="primary" onClick={this.addComment}>Submit</Button>
                            <Button bsStyle="link" onClick={this.props.closeBlock}>Cancel</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

CommentReply.propTypes = {
  commentData: PropTypes.object,
  closeBlock: PropTypes.func
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentReply);
