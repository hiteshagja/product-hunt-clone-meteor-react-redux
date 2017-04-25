import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import ReactDOM from 'react-dom';
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

class CollectionEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageId: props.collection.image,
            image: props.collection.imagePath,
            isDisable:false
        };
        this.updateCollection = this.updateCollection.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(e) {
        e.preventDefault();
        this.setState({isDisable:true});
        self = this;
        this.setState({image: '/images/loading.gif'});
        let fileObj = e.target.files[0];
        Images.insert(fileObj, (err, res) => {
            if (err) {
                self.setState({isDisable:false});
                bertError(err.message)
            } else {
                path = 'http://' + window.location.host + res.url({brokenIsFine: true});
                setTimeout(function() {
                    self.setState({imageId: res._id, image: path});
                    self.setState({isDisable:false});
                }, 3000);
            }
        })
    }

    updateCollection(e) {
        e.preventDefault();

        let show = $('input[type="checkbox"]:checked');

        const objData = {
            id: this.props.collection._id,
            name: ReactDOM.findDOMNode(this.refs.txtTitle).value,
            description: this.refs.txtDescription ? ReactDOM.findDOMNode(this.refs.txtDescription).value : '',
            image: this.state.imageId,
            postId: this.props.collection.postId,
            show: show.length > 0
                ? true
                : false
        }

        this.props.updateCollection(objData, (err, res) => {
            if (err) {
                bertError(err.message);
            } else {
                bertSuccess(Constant.MESSAGES.COLLECTION.UPDATE);
                this.props.closeModal();
                this.props.getList(Meteor.user().slug);
            }
        });
    }

    render() {
        const {collection} = this.props;
        let checkbox = collection.show
            ? <Checkbox inline checked onChange></Checkbox>
            : <Checkbox inline></Checkbox>;

        if (collection.isAdmin) {
            return (
                <Modal show={this.props.showModal} bsSize="large" aria-labelledby="contained-modal-title" onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit Collection</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalTitle">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Title
                                </Col>
                                <Col sm={9}>
                                    <FormControl type="text" ref="txtTitle" defaultValue={collection.name}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalBody">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Descripton
                                </Col>
                                <Col sm={9}>
                                    <FormControl type="text" ref="txtDescription" componentClass="textarea" defaultValue={collection.description}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalImage">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Thumbnail URL
                                </Col>
                                <Col sm={9}>
                                    <Image width={100} height={100} src={this.state.image} thumbnail/>
                                    <FormControl type="file" ref="fileImage" onChange={this.handleFileChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalImage">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Show to users
                                </Col>
                                <Col sm={9}>
                                    {checkbox}
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalSubmit">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <Button disabled={this.state.isDisable} bsStyle="primary" onClick={this.updateCollection}>Save</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
            )
        } else {
            return (
                <Modal show={this.props.showModal} bsSize="large" aria-labelledby="contained-modal-title" onHide={this.props.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit Collection</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalTitle">
                                <Col componentClass={ControlLabel} sm={3}>
                                    Title
                                </Col>
                                <Col sm={9}>
                                    <FormControl type="text" ref="txtTitle" defaultValue={collection.name}/>
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalSubmit">
                                <Col componentClass={ControlLabel} sm={12}>
                                    <Button disabled={this.state.isDisable} bsStyle="primary" onClick={this.updateCollection}>Save</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                </Modal>
            )
        }
    }
}

CollectionEdit.propTypes = {
    showModal: PropTypes.bool,
    collection: PropTypes.object,
    closeModal: PropTypes.func
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionEdit);
