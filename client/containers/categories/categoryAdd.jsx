import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import ReactDOM from 'react-dom';

import {
    Button,
    Modal,
    Form,
    FormControl,
    FormGroup,
    Col,
    ControlLabel
} from 'react-bootstrap';

class CategoryAdd extends Component {
    addCategory(e) {
        e.preventDefault();
        const objCategoryData = {
            name: ReactDOM.findDOMNode(this.refs.txtName).value,
            description: ReactDOM.findDOMNode(this.refs.txtDesc).value,
            order: ReactDOM.findDOMNode(this.refs.txtOrder).value,
            slug: ReactDOM.findDOMNode(this.refs.txtSlug).value,
            image: ReactDOM.findDOMNode(this.refs.txtImage).value,
            parentId: ReactDOM.findDOMNode(this.refs.drpCategory).value,
        }

        this.props.addCategory(objCategoryData, (err, res) => {
          if (err) {
              bertError(err.message);
          } else {
              bertSuccess(Constant.MESSAGES.CATEGORY.ADD)
              this.props.toggleCategoryModal(false);
              this.props.getAllCategory();
          }
        });
    }

    render() {
        return (
            <Modal show={this.props.showCategoryModal} bsSize="large" aria-labelledby="contained-modal-title" onHide={() => (this.props.toggleCategoryModal(false))}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalName">
                            <Col componentClass={ControlLabel} sm={3}>
                                Name
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtName"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalDescription">
                            <Col componentClass={ControlLabel} sm={3}>
                                Description
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtDesc"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalOrder">
                            <Col componentClass={ControlLabel} sm={3}>
                                Order
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtOrder"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalSlug">
                            <Col componentClass={ControlLabel} sm={3}>
                                Slug
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtSlug"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalImage">
                            <Col componentClass={ControlLabel} sm={3}>
                                Image
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtImage"/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalCategory">
                            <Col componentClass={ControlLabel} sm={3}>
                                Parent ID
                            </Col>
                            <Col sm={9}>
                            <FormControl ref="drpCategory" componentClass="select">
                                <option key={-1} value="">select category</option>
                                {this.props.categories.map((category, index) => (
                                  <option key={index} value={category._id}>{category.name}</option>
                                ))}
                            </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalSubmit">
                            <Col componentClass={ControlLabel} sm={12}>
                                <Button bsStyle="primary" onClick={this.addCategory.bind(this)}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

CategoryAdd.propTypes = {
    showCategoryModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
      showCategoryModal: state.categoryReducer.category_toggle,
      categories: state.categoryReducer.category_getAll
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryAdd);
