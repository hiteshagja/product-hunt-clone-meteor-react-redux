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

class PostAdd extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            image: '',
            showImageUrlTextbox: false
        }
        this.fetchDataFromUrl = this.fetchDataFromUrl.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.showTextbox = this.showTextbox.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    fetchDataFromUrl() {
        const self = this;
        let urlData = Embedly.embed(ReactDOM.findDOMNode(this.refs.txtUrl).value);
        setTimeout(function() {
            self.setState({title: urlData.title, description: urlData.description, image: urlData.thumbnail_url})
        }, 100);
    }
    addPost(e) {
        e.preventDefault();
        let selectedCategory = [];
        $('input[type="checkbox"]:checked').each(function() {
            selectedCategory.push($(this).val())
        })

        const objPostData = {
            url: ReactDOM.findDOMNode(this.refs.txtUrl).value,
            title: ReactDOM.findDOMNode(this.refs.txtTitle).value,
            body: ReactDOM.findDOMNode(this.refs.txtDescription).value,
            imageUrl: ReactDOM.findDOMNode(this.refs.imgUrl).src,
            categoryId: selectedCategory,
            status: Constant.STATUS.PENDING
        }

        if (Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
            objPostData['status'] = $('#formControlsSelect').val();
        }

        this.props.addPost(objPostData);
        this.props.togglePostModal(false);
        this.state = {
            title: '',
            description: '',
            image: '',
            showImageUrlTextbox: false
        }
        this.props.getAllPost();
    }

    removeImage(e) {
        e.preventDefault();
        this.setState({image: ''});
    }

    showTextbox(e) {
        e.preventDefault();
        this.setState({showImageUrlTextbox: true});
    }

    closeModal(e) {
        e.preventDefault();
        this.state = {
            title: '',
            description: '',
            image: '',
            showImageUrlTextbox: false
        }
        this.props.togglePostModal(false);
    }

    render() {
        let image,
            showTextbox,
            status,
            categories;
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
            status = (<PostAdminSection post={{}}/>)
        }

        return (
            <Modal show={this.props.showPostModal} bsSize="large" aria-labelledby="contained-modal-title" onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalUrl">
                            <Col componentClass={ControlLabel} sm={3} className="text-left">
                                URL
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtUrl" onBlur={this.fetchDataFromUrl}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalTitle">
                            <Col componentClass={ControlLabel} sm={3}>
                                Title
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtTitle" value={this.state.title}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalBody">
                            <Col componentClass={ControlLabel} sm={3}>
                                Body
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtDescription" componentClass="textarea" value={this.state.description}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalCategory">
                            <Col componentClass={ControlLabel} sm={3}>
                                Categories
                            </Col>
                            <Col sm={9}>
                                {this.props.categories.map((category, index) => (<CategoryCheckbox category={category} key={index}/>))}
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
                                <Button bsStyle="primary" onClick={this.addPost.bind(this)}>Save</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

PostAdd.propTypes = {
    showPostModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {postId: state.postReducer.post_add, showPostModal: state.postReducer.post_toggle, categories: state.categoryReducer.category_getAll}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAdd);
