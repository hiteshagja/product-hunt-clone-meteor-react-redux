import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import ReactDOM from 'react-dom';
import {Images} from '../../../lib/collections/images';

import {
    Button,
    Form,
    FormControl,
    FormGroup,
    Col,
    ControlLabel,
    Image,
    Checkbox,
    Panel
} from 'react-bootstrap';

class CollectionForm extends Component {
    constructor() { 
        super();
        this.state = {
            imageId: '',
            image: '',
            isDisable:false
        };
        this.addCollection = this.addCollection.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(e) {
        e.preventDefault();
        self = this;
        this.setState({isDisable:true});
        this.setState({image: '/images/loading.gif'});
        let fileObj = e.target.files[0];
        Images.insert(fileObj, (err, res) => {
            if (err) {
                bertError(err.message)
                this.setState({isDisable:false});
            } else {
              path = 'http://' + window.location.host + res.url({brokenIsFine: true});
              setTimeout(function () {
                self.setState({
                  imageId: res._id,
                  image: path
                });
                self.setState({isDisable:false});
              }, 3000);
            }
        })
    }

    addCollection(e) {
        e.preventDefault();
        self = this;
        let show = $('input[type="checkbox"]:checked');

        const objData = {
            name: ReactDOM.findDOMNode(this.refs.txtName).value,
            description: this.refs.txtDescription
                ? ReactDOM.findDOMNode(this.refs.txtDescription).value
                : '',
            image: this.state.imageId,
            postId: [this.props.post._id],
            show: show.length > 0
                ? true
                : false
        }

        this.props.addList(objData, (err, res) => {
            if (err) {
                bertError(err.message);
            } else {
                ReactDOM.findDOMNode(self.refs.txtName).value = ''
                if (self.refs.txtDescription) {
                    ReactDOM.findDOMNode(this.refs.txtDescription).value = '';
                    self.setState({imageId: ''});
                }
                self.props.closeModal();
                bertSuccess(Constant.MESSAGES.COLLECTION.POST_ADDED);
                this.props.getAdminCollections();
            }
        });
    }

    render() {
        if (Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
            return (
                <Panel>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalTitle">
                            <Col componentClass={ControlLabel} sm={3}>
                                Title
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtName"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalBody">
                            <Col componentClass={ControlLabel} sm={3}>
                                Descripton
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtDescription" componentClass="textarea"/>
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
                                <Checkbox inline></Checkbox>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalSubmit">
                            <Col sm={10}>
                                <Button  disabled={this.state.isDisable} bsStyle="primary" onClick={this.addCollection}>Save</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel>
            )
        } else {
            return (
                <Panel>
                    <Form>
                        <FormGroup controlId="formHorizontalTitle">
                            <Col componentClass={ControlLabel} sm={2}>
                                Name
                            </Col>
                            <Col sm={10}>
                                <FormControl ref="txtName" type="text"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalSubmit">
                            <Col sm={10} componentClass={ControlLabel}>
                                <Button onClick={this.addCollection} bsStyle="primary">
                                    Save
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Panel>
            )
        }
    }
}

function mapStateToProps(state) {
    return {role: state.signInReducer.role}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionForm);
