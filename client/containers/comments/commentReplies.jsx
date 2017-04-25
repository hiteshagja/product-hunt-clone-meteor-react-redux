import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import CommentItem from './commentItem';
import {Row, Col} from 'react-bootstrap';

class CommentReplies extends Component {
    render() {
        return (
            <Row>
                <Col md={11} mdOffset={1}>
                    {this.props.replies.map((comment, index) => (<CommentItem data={comment} key={index}/>))}
                </Col>
            </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentReplies);
