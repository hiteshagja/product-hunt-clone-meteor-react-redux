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

class CategoryEdit extends Component {
    constructor(props) {
        super(props);
        // console.log(props.parentCategory._id);
        // if (props.parentCategory) {
        //   this.state = {
        //     parentId: props.parentCategory._id
        //   }
        // }
        // else {
        //   this.state = {
        //     parentId: ''
        //   }
        // }
        this.updateCategory = this.updateCategory.bind(this);
    }

    // componentWillMount() {
    //   if (this.props.category.parentId) {
    //     this.props.getCategory(this.props.category.parentId);
    //   }
    // }

    updateCategory(e) {
      self = this;
        e.preventDefault();
        const objCategory = {
            categoryId: this.props.category._id,
            name: ReactDOM.findDOMNode(this.refs.txtName).value,
            description: ReactDOM.findDOMNode(this.refs.txtDesc).value,
            order: ReactDOM.findDOMNode(this.refs.txtOrder).value,
            slug: ReactDOM.findDOMNode(this.refs.txtSlug).value,
            image: ReactDOM.findDOMNode(this.refs.txtImage).value,
            parentId: ReactDOM.findDOMNode(this.refs.drpCategory).value
        }

        this.props.updateCategory(objCategory, (err, res) => {
          if (err) {
              bertError(err.message);
          } else {
              bertSuccess(Constant.MESSAGES.CATEGORY.UPDATE)
              self.props.closeModal();
          }
        });
    }

    render() {
        return (
            <Modal show={this.props.showModal} bsSize="large" aria-labelledby="contained-modal-title" onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title">Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                            <Col componentClass={ControlLabel} sm={3}>
                                Name
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtName" defaultValue={this.props.category.name}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalPassword">
                            <Col componentClass={ControlLabel} sm={3}>
                                Description
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtDesc" defaultValue={this.props.category.description}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalOrder">
                            <Col componentClass={ControlLabel} sm={3}>
                                Order
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtOrder" defaultValue={this.props.category.order}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalSlug">
                            <Col componentClass={ControlLabel} sm={3}>
                                Slug
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtSlug" defaultValue={this.props.category.slug}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalImage">
                            <Col componentClass={ControlLabel} sm={3}>
                                Image
                            </Col>
                            <Col sm={9}>
                                <FormControl type="text" ref="txtImage" defaultValue={this.props.category.image}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalCategory">
                            <Col componentClass={ControlLabel} sm={3}>
                                Parent ID
                            </Col>
                            <Col sm={9}>
                                <FormControl ref="drpCategory" componentClass="select" defaultValue={this.props.category.parentId}>
                                    <option key={-1} value="">select category</option>
                                    {this.props.categories.map((category, index) => (
                                        <option key={index} value={category._id}>{category.name}</option>
                                    ))}
                                </FormControl>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalSubmit">
                            <Col componentClass={ControlLabel} sm={12}>
                                <Button bsStyle="primary" onClick={this.updateCategory}>Submit</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

CategoryEdit.propTypes = {
    showModal: PropTypes.bool,
    closeModal: PropTypes.func,
    category: PropTypes.object
};

function mapStateToProps(state) {
    return {categories: state.categoryReducer.category_getAll, parentCategory: state.categoryReducer.category_get}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);
