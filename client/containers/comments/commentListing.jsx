import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import CommentItem from './commentItem';
import {
    Row,
    Col,
    Well,
    Media,
    Image,
    Button
} from 'react-bootstrap';

class CommentListing extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Row>
                    <Col md={12}>
                        <h3>Comments</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {this.props.post_comments.map((data, index) => (<CommentItem data={data} key={index}/>))}
                    </Col>
                </Row>
            </div>
        )
    }
}

CommentListing.propTypes = {
    post: PropTypes.object
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListing);
