import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {Row, Col, FormControl, FormGroup, Button} from 'react-bootstrap';

class CommentAddReply extends Component {
    constructor() {
        super();
        this.addComment = this.addComment.bind(this);
    }

    addComment(e) {
        e.preventDefault();
        self = this;
        let commentObj = {
            body: ReactDOM.findDOMNode(this.refs.txtComment).value,
            postId: this.props.commentData.postId,
            parentCommentId: this.props.commentData._id
        }

        this.props.addComment(commentObj, function (err, res) {
          if (err) {
            bertError(err.message)
          }
          else {
            ReactDOM.findDOMNode(self.refs.txtComment).value = '';
            self.props.closeBlock();
            self.props.getPostComments(self.props.commentData.postId);
            self.props.getPost(self.props.commentData.postId);
          }
        });
    }

    render() {
        return (
            <Row>
                <Col md={10} mdOffset={1}>
                    <Row>
                        <Col md={12}>
                            <FormGroup controlId="formControlsTextarea">
                                <FormControl ref="txtComment" componentClass="textarea" placeholder="Write reply"/>
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

CommentAddReply.propTypes = {
  commentData: PropTypes.object,
  closeBlock: PropTypes.func
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAddReply);
