import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import ReactDOM from 'react-dom';
import CategoryCheckbox from '../categories/categoryCheckbox';
import PostAdminSection from './postAdminSection';
import {Images} from '../../../lib/collections/images';

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

function isUrl(url) {
    var regexp = /https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|\[^\s]+\.[^\s]{2,}/
    return regexp.test(url);
}

class PostAdd extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            image: '',
            showImageUrlTextbox: false,
            images: [],
            tempImageUrl: [],
            isDisable: false
        }
        this.fetchDataFromUrl = this.fetchDataFromUrl.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.showTextbox = this.showTextbox.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleblur = this.handleblur.bind(this);
    }

    fetchDataFromUrl() {
        const self = this;
        let url = ReactDOM.findDOMNode(this.refs.txtUrl).value;
        if (isUrl(url)) {
            let urlData = Embedly.embed(ReactDOM.findDOMNode(this.refs.txtUrl).value);
            if (urlData) {
                setTimeout(function() {
                    ReactDOM.findDOMNode(self.refs.txtTitle).value = urlData.title
                        ? urlData.title
                        : '';
                    ReactDOM.findDOMNode(self.refs.txtDescription).value = urlData.description
                        ? urlData.description
                        : '';
                    self.setState({title: urlData.title, description: urlData.description, image: urlData.thumbnail_url})
                }, 100);
            } else {
                bertError('Please Check your Url');
            }
        } else {
            bertError('Please enter valid Url');
            ReactDOM.findDOMNode(this.refs.txtUrl).value = "";
        }
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
            imageUrl: this.state.image,
            images: this.state.images,
            categoryId: selectedCategory,
            status: Constant.STATUS.PENDING
        }

        if (Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
            objPostData['status'] = $('#formControlsSelect').val();
        }

        this.props.addPost(objPostData, (err, res) => {
            if (err) {
                bertError(err.message);
            } else {
                bertSuccess(Constant.MESSAGES.POST.ADD);
                this.props.togglePostModal(false);
                this.state = {
                    title: '',
                    description: '',
                    image: '',
                    showImageUrlTextbox: false,
                    images: [],
                    tempImageUrl: []
                }
                // console.log(this.postDetail);
                let today;
                today = moment(new Date(), 'YYYY-MM-DD').toDate();
                // var self = this;
                // setTimeout(function() {
                //     self.props.getAllPost(self.props.postDetail);
                // }, 500);
            }
        });
    }

    handleblur(e) {
        imageUrl = e.target.value;
        if (isUrl(imageUrl)) {
            this.setState({image: imageUrl});
        } else {
            bertError('Please enter valid Url');
        }
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
        this.state = {
            title: '',
            description: '',
            image: '',
            showImageUrlTextbox: false,
            images: [],
            tempImageUrl: []
        }
        this.props.togglePostModal(false);
    }

    handleFileChange(e) {
        e.preventDefault();
        this.setState({isDisable: true});
        self = this;
        // this.setState({image: '/images/loading.gif'});
        let fileObj = e.target.files[0];
        let imageId = this.state.images;
        var tempImage = this.state.tempImageUrl;
        Images.insert(fileObj, (err, res) => {
            if (err) {
                self.setState({isDisable: false});
                bertError(err.message)
            } else {
                path = 'http://' + window.location.host + res.url({brokenIsFine: true});
                imageId.push(res._id);
                self.setState({images: imageId});
                setTimeout(function() {
                    tempImage.push(path);
                    self.setState({isDisable: false});
                }, 1000);

                // setTimeout(function () {
                //   self.setState({tempImageUrl:tempImageUrl})
                // },2000);
                // self.setState({isDisable:false});
            }
        })
        setTimeout(function() {
            self.setState({tempImageUrl: tempImage})
        }, 2000);
    }

    render() {
        // console.log(this.state);
        let image,
            showTextbox,
            status,
            categories,
            images,
            imageLoading;
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
            showTextbox = <FormControl type="text" onBlur={this.handleblur} ref="txtImageUrl"/>;
        }

        if (Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
            status = (<PostAdminSection post={{}}/>)
        }

        if (this.state.tempImageUrl != null) {
            images = this.state.tempImageUrl.map((data, index) => (<Image width={100} height={100} key={index} src={data} thumbnail/>));
        }

        if (this.state.isDisable) {
            imageLoading = <Image width={100} height={100} src="/images/loading.gif" thumbnail/>;
        } else {
            imageLoading = "";
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
                                <FormControl type="text" ref="txtTitle"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalBody">
                            <Col componentClass={ControlLabel} sm={3}>
                                Body
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtDescription" componentClass="textarea"/>
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
                        <FormGroup controlId="formHorizontalImage">
                            <Col componentClass={ControlLabel} sm={3}>
                                Post Images
                            </Col>
                            <Col sm={9}>
                                {images}
                                {imageLoading}
                                <FormControl type="file" ref="fileImage" onChange={this.handleFileChange}/>
                            </Col>
                        </FormGroup>

                        {status}
                        <FormGroup controlId="formHorizontalSubmit">
                            <Col componentClass={ControlLabel} sm={12}>
                                <Button disabled={this.state.isDisable} bsStyle="primary" onClick={this.addPost.bind(this)}>Save</Button>
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
    return {showPostModal: state.postReducer.post_toggle, categories: state.categoryReducer.category_getAll, postDetail: state.postReducer.postDateDetail}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostAdd);
