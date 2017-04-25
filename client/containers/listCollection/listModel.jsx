import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import ReactDOM from 'react-dom';
import CollectionForm from './collectionForm';

import {
    Row,
    Col,
    Well,
    Button,
    Modal,
    Form,
    FormControl,
    FormGroup,
    ListGroup,
    ListGroupItem,
    ControlLabel
} from 'react-bootstrap';

class CustomButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: props.data.postId.indexOf(props.post._id) > -1
                ? true
                : false
        };
        this.listSelect = this.listSelect.bind(this);
    }

    listSelect(e) {
        e.preventDefault();
        self = this;
        if (this.state.select) {
          bertSuccess(Constant.MESSAGES.COLLECTION.EXIEST);
        }else{
          this.props.updateList(this.props.data._id, this.props.post._id, (err, res) => {
            if (err) {
                bertError(err.message);
            } else {
                bertSuccess(Constant.MESSAGES.COLLECTION.POST_ADDED);
                if (self.state.select === true) {
                    self.setState({select: false});
                } else {
                    self.setState({select: true});
                }
                self.props.closeListModal();

                self.props.getList(Meteor.user().slug);
            }
        });
      }
    }

    render() {
        let showSelected;
        if (this.state.select) {
            showSelected = <i className="fa fa-check pull-right" aria-hidden="true"></i>
        }
        return (
            <ListGroupItem onClick={this.listSelect}>
                {this.props.data.name}
                {showSelected}
            </ListGroupItem>
        );
    }
}

class ListModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addlist: false
        }
        this.addNewList = this.addNewList.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    addNewList() {
        this.setState({addlist: true});
    }

    closeModal() {
        this.setState({addlist: false});
        this.props.closeListModal();
    }

    render() {
        let addlist,
            collectionList;
        const listData = this.props.listData;

        if (listData.length > 0) {
            collectionList = (listData.map((data, index) => (<CustomButton data={data} key={index} post={this.props.post} updateList={this.props.updateList} getList={this.props.getList} closeListModal={this.props.closeListModal}/>)))
        } else {
            collectionList = (
                <ListGroupItem style={{
                    color: "#999999"
                }}>No collectios yet.</ListGroupItem>
            )
        }

        if (this.state.addlist) {
            addlist = <CollectionForm post={this.props.post} closeModal={this.closeModal}/>
        } else {
            addlist = (
                <Well>
                    <Button onClick={this.addNewList} bsStyle="link">Add new collection</Button>
                </Well>
            )
        }

        return (
            <Modal show={this.props.showModal} bsSize="large" className="collection-modal" onHide={this.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">Choose collection</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col md={4}>
                            <ListGroup>
                                {collectionList}
                            </ListGroup>
                        </Col>
                        <Col md={8}>
                            {addlist}
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {listData: state.listtoggle.list_data, role: state.signInReducer.role}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListModel);
