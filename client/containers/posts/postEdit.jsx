import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import ReactDOM from 'react-dom';
import CategoryCheckbox from '../categories/categoryCheckbox';
import PostAdminSection from './postAdminSection';
import {
    Button,
    Modal,
    Form,
    FormControl,
    FormGroup,
    Col,
    ControlLabel,
    Image,
    Checkbox
} from 'react-bootstrap';

class PostEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            image: props.post.imageUrl,
            showImageUrlTextbox: false
        };
        this.editPost = this.editPost.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.showTextbox = this.showTextbox.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    editPost(e) {
        e.preventDefault();
        self = this;

        let selectedCategory = [];
        $('input[type="checkbox"]:checked').each(function() {
            selectedCategory.push($(this).val())
        })

        const objPostData = {
            postId: self.props.post._id,
            url: ReactDOM.findDOMNode(this.refs.txtUrl).value,
            title: ReactDOM.findDOMNode(this.refs.txtTitle).value,
            body: ReactDOM.findDOMNode(this.refs.txtDescription).value,
            imageUrl: ReactDOM.findDOMNode(this.refs.imgUrl).src,
            categoryId: selectedCategory
        }

        if (Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
            objPostData['status'] = $('#formControlsSelect').val();
        }
        this.props.editPost(objPostData);
        this.props.closeModal();
    }

    removeImage(e) {
        e.preventDefault();
        this.setState({image: ''});
    }

    showTextbox(e) {
        e.preventDefault();
        this.setState({showImageUrlTextbox: true});
    }

    deletePost(e) {
        e.preventDefault();
        this.props.editPost({postId: this.props.post._id, isDeleted: true});
        this.props.closeModal();
    }

    render() {
        const {post, categories} = this.props;

        let status,
            image,
            showTextbox;
        if (this.state.image) {
            image = (
                <div>
                    <Image width={200} height={200} ref="imgUrl" src={this.state.image} thumbnail/>
                    <br/>
                    <Button bsStyle="link" onClick={this.removeImage}>Clear thumbnail</Button>
                </div>
            )
        }

        if (this.state.showImageUrlTextbox) {
            showTextbox = <FormControl type="text" ref="txtImageUrl"/>;
        }

        if (Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
            status = (<PostAdminSection post={post} />)
        }

        return (
            <Modal show={this.props.showModal} bsSize="large" aria-labelledby="contained-modal-title" onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Edit Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalUrl">
                            <Col componentClass={ControlLabel} sm={3}>
                                Url
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtUrl" defaultValue={post.url}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalTitle">
                            <Col componentClass={ControlLabel} sm={3}>
                                Title
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtTitle" defaultValue={post.title}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalBody">
                            <Col componentClass={ControlLabel} sm={3}>
                                Description
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtDescription" defaultValue={post.body}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalCategory">
                            <Col componentClass={ControlLabel} sm={3}>
                                Categories
                            </Col>
                            <Col sm={9}>
                                {categories.map((category, index) => (<CategoryCheckbox category={category} post={post} key={index}/>))}
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalImage">
                            <Col componentClass={ControlLabel} sm={3}>
                                Thumbnail URL
                            </Col>
                            <Col sm={9}>
                                {image}
                                <Button bsStyle="link" onClick={this.showTextbox}>Enter URL</Button>
                                {showTextbox}
                            </Col>
                        </FormGroup>

                        {status}
                        <FormGroup controlId="formHorizontalSubmit">
                            <Col componentClass={ControlLabel} sm={12}>
                                <Button bsStyle="primary" onClick={this.editPost}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="link" bsSize="large" onClick={this.deletePost}>
                        <i className="fa fa-times left"></i>
                        Delete</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

PostEdit.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    post: PropTypes.object
};

function mapStateToProps(state) {
    return {post_update: state.postReducer.post_update, categories: state.categoryReducer.category_getAll}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEdit);
