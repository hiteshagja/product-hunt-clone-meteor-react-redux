import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {Grid, Well, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';


class ProfileCollectionList extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }
    componentWillMount(){
      this.props.getList(Meteor.userId());
    }
    handleClick(data){
      // console.log(name);
      browserHistory.push('/@'+name+'/collection/'+data.slug);
    }
    render() {
        return (
          <div>
          {this.props.data.map((data, index) => (
            <Col md={6} style={{padding:10}}>
                <div onClick={()=>{this.handleClick(data)}} className="collectionDiv">
                  <p>{data.name}</p>
                </div>
            </Col>
          ))}
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {data:state.listtoggle.list_data}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCollectionList);
