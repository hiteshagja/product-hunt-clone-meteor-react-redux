import React, {PropTypes, Component} from 'react';
import {NavItem} from 'react-bootstrap';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'

import {
    Button,
    Modal,
    Form,
    FormControl,
    FormGroup,
    Col,
    ControlLabel
} from 'react-bootstrap';

class SignIn extends Component {
    constructor() {
        super();
        this.signInWithFacebook = this.signInWithFacebook.bind(this);
        this.signInWithTwitter = this.signInWithTwitter.bind(this);
    }

    signInWithFacebook(e) {
        e.preventDefault();
        this.props.signInWithFacebook();
        this.props.toggleSignInModal(false);
    }

    signInWithTwitter(e) {
        e.preventDefault();
        this.props.signInWithTwitter();
        this.props.toggleSignInModal(false);
    }

    render() {
        const buttonStyles = {
            maxWidth: 350,
            margin: '0 auto 15px'
        };

        return (
            <Modal show={this.props.showSignInModal} bsSize="small" aria-labelledby="contained-modal-title-sm" onHide={() => {
                this.props.toggleSignInModal(false)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-sm">SignIn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={buttonStyles}>
                        <Button bsStyle="primary" bsSize="large" block onClick={this.signInWithFacebook}>Facebook</Button>
                        <Button bsStyle="info" bsSize="large" block onClick={this.signInWithTwitter}>Twitter</Button>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }
}

SignIn.propTypes = {
    showSignInModal: PropTypes.bool,
    facebook: PropTypes.string,
    twitter: PropTypes.string
};

function mapStateToProps(state) {
    return {showSignInModal: state.signInReducer.signIn_toggle, facebook: state.signInWithFacebook, twitter: state.signInWithTwitter}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
