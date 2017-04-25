import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {
    Grid,
    Well,
    Row,
    Col,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap';
import {Link, browserHistory} from 'react-router';
import CollectionEdit from '../listCollection/collectionEdit';

class ProfileCollectionList extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleClick() {
        browserHistory.push('/@' + this.props.slug   + '/collection/' + this.props.data.slug);
    }

    handleEditClick(e) {
        e.preventDefault();
        this.setState({showModal: true});
    }

    closeModal() {
        this.setState({showModal: false});
    }

    render() {
        let editModal, editIcon;
        if (Meteor.user().slug == this.props.slug) {
          editIcon = (<a className="pull-right link" onClick={this.handleEditClick}>
              <i className="fa fa-pencil"></i>
          </a>)
        }
        if (this.state.showModal) {
            editModal = <CollectionEdit showModal={this.state.showModal} collection={this.props.data} closeModal={this.closeModal}/>
        }
        const bgImage = {
            backgroundImage: "url(" + this.props.data.imagePath + ")"
        }
        return (
            <Col md={4} style={{
                padding: 10
            }}>
                <div className="collectionDiv " style={bgImage}>
                      {editIcon}
                    <div className="collectionNameMiddle text-center">
                    <h4><a onClick={this.handleClick}>{this.props.data.name}</a></h4>
                    </div>
                </div>
                {editModal}
            </Col>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCollectionList);
