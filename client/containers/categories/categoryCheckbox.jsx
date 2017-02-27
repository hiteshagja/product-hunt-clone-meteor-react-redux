import React, {PropTypes, Component} from 'react';

import {Checkbox, Col} from 'react-bootstrap';

class CategoryCheckbox extends Component {
    render() {
        if (this.props.post && this.props.post.categoryId.indexOf(this.props.category._id) > -1) {
            return (
                <Col sm={6}>
                <Checkbox defaultChecked value={this.props.category._id}>
                        {this.props.category.name}
                    </Checkbox>
                </Col>
            )
        } else {
            return (
                <Col sm={6}>
                    <Checkbox value={this.props.category._id}>
                        {this.props.category.name}
                    </Checkbox>
                </Col>
            )
        }
    }
}

CategoryCheckbox.propTypes = {
    category: PropTypes.object,
    post: PropTypes.object
};

export default CategoryCheckbox;
