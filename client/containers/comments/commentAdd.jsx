import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {
    Row,
    Col,
    FormGroup,
    FormControl,
    Button
} from 'react-bootstrap';

class CommentAdd extends Component {
  constructor() {
    super();
    this.addComment = this.addComment.bind(this);
  }

  addComment(e) {
    e.preventDefault();
    self = this;
    let commentObj = {
      body: ReactDOM.findDOMNode(this.refs.txtComment).value,
      postId: this.props.post._id
    }

    this.props.addComment(commentObj, function (err, res) {
      if (err) {
        bertError(err.message)
      }
      else {
        ReactDOM.findDOMNode(self.refs.txtComment).value = '';
        self.props.getPostComments(self.props.post._id);
        self.props.getPost(self.props.post._id);
      }
    });
  }

    render() {
        return (
            <div>
                <Row>
                    <Col md={12}>
                        <h3>New Comment</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                            <FormControl ref="txtComment" componentClass="textarea" placeholder="Write comment"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Button bsStyle="primary" onClick={this.addComment}>Submit</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

CommentAdd.propTypes = {
  post: PropTypes.object
}

function mapStateToProps(state) {
    return {commentId: state.commentReducer.comment_add}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAdd);
