import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {Grid, Well, Row, Col, ListGroup, ListGroupItem,Image} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';
import ProfileCollectionList  from './collection';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          componentLoad:'upvotes'
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount(){
      this.props.getList(Meteor.userId());
    }

    handleClick(data){
      this.setState({componentLoad:data})
    }

    render() {
      let center;
        if(this.state.componentLoad=='upvotes'){
          center = <h1> Upvote component here</h1>;
        }
        if(this.state.componentLoad=='topics'){
          center = <h1> topics component here</h1>;
        }
        if(this.state.componentLoad=='collection'){
          center = <ProfileCollectionList />;
        }
        return (
            <Grid>
                <Row>
                  <Col md={12}>
                    <Well className="user-profile">
                        <div className="profilePicture">
                          <Image src="http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-short-hair-girl.png" width={140} height={140} circle />
                        </div>
                        <div>
                        <h1>Jigar yadav</h1>
                        <h3>@Jigar</h3>
                        </div>
                    </Well>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}>
                    <div className="left-side">
                      <p onClick={()=>{this.handleClick('upvotes')}}><a className={this.state.componentLoad=='upvotes' ? "Active" : " "}>7 Upvotes</a></p>
                      <p onClick={()=>{this.handleClick('topics')}}><a className={this.state.componentLoad=='topics' ? "Active" : " "} >0 Topics</a></p>
                      <p onClick={()=>{this.handleClick('collection')}}><a className={this.state.componentLoad=='collection' ? "Active" : ""}>{this.props.data.length} Collections Made</a></p>
                    </div>
                  </Col>
                  <Col md={7}>
                    <div className="post-by-day panel panel-default" style={{overflow:'hidden'}} >
                      {center}
                    </div>
                  </Col>
                  <Col md={3}>
                    <Well >
                        right
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
