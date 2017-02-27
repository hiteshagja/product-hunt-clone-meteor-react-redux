import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {Grid, Well, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';


class collectionList extends Component {
    constructor(props) {
        super(props);
        props.getPost(props.params.id);
        this.handleClick = this.handleClick.bind(this);

    }
    componentWillMount(){
      this.props.getList(Meteor.userId());
    }
    handleClick(data){
      console.log(name);
      browserHistory.push('/@'+name+'/collection/'+data.slug);
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <Well>
                        <ListGroup>
                         {this.props.data.map((data, index) => (<ListGroupItem key={index} onClick={()=>{this.handleClick(data)}}>{data.name}</ListGroupItem>))}
                        </ListGroup>
                        </Well>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    Meteor.subscribe('users');
    return {data:state.listtoggle.list_data}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(collectionList);
