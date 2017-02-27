import React, {PropTypes, Component} from 'react';
import {FormControl, FormGroup, Col, ControlLabel} from 'react-bootstrap';

class PostAdminSection extends Component {
    render() {
        return (
            <div>
                <h4>Admin</h4>
                <hr/>
                <FormGroup controlId="formControlsSelect">
                    <Col componentClass={ControlLabel} sm={3}>
                        Status
                    </Col>
                    <Col sm={9}>
                        <FormControl ref="drpCategory" componentClass="select" defaultValue={this.props.post.status}>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </FormControl>
                    </Col>
                </FormGroup>
            </div>
        )
    }
}

PostAdminSection.propTypes = {
    post: PropTypes.object
};

export default PostAdminSection;
