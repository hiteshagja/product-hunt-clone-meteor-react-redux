import React, { PropTypes } from 'react';
import { Row, Col, Panel, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import ReactDOM from 'react-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  handleLoginClick(e) {
    self = this;
    var data = {
      email: ReactDOM.findDOMNode(this.refs.txtEmail).value,
      password: ReactDOM.findDOMNode(this.refs.txtPassword).value
    }

    this.props.superUserCheck(data, function (result) {
      if (result.length > 0) {
        localStorage.superAdmin = result._id;
        self.props.getAllCategory();
        self.props.getCurrentUser();
        browserHistory.push('/');
      }
    })
  }

  render () {
    return(
      <Row className="show-grid">
        <Col xs={4} xsOffset={4}>
          <Panel header="Login">
            <Form horizontal>
              <FormGroup controlId="formHorizontalUrl">
                <Col componentClass={ControlLabel} sm={3} className="text-left">
                  Username
                </Col>
                <Col sm={9}>
                  <FormControl type="text" ref="txtEmail" onBlur={this.fetchDataFromUrl}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalTitle">
                <Col componentClass={ControlLabel} sm={3}>
                  Password
                </Col>
                <Col sm={9}>
                  <FormControl type="password" ref="txtPassword"/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalSubmit" className="pull-right">
                <Col componentClass={ControlLabel} sm={12}>
                  <Button bsStyle="primary" onClick={this.handleLoginClick}>Login</Button>
                </Col>
              </FormGroup>
            </Form>
          </Panel>
        </Col>
      </Row>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state, props) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
