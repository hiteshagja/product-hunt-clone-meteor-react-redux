import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {Grid, Well, Row, Col, Image} from 'react-bootstrap';
import PostItem from '../posts/postItem';


class collectionPost extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount(){
      var listId = this.props.params;
      if(listId.collection){
        this.props.collectionName(listId.collection);
        this.props.singleListData(listId.collection);
      }
    }
    render() {
      let Author;
        if(this.props.data.length>0){
          Author = this.props.data[0].author;
        }
        return (
            <Grid>
              <Row>
                  <Col md={12}>
                      <Well className="collectionName">
                          <p>{this.props.categoryName}</p>
                          <p><Image src="http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-short-hair-girl.png" width={30} height={30} circle />&nbsp; by -{Author}</p>
                      </Well>
                  </Col>
              </Row>
                <Row>
                    <Col md={12}>
                        <Well>
                            {this.props.data.map((post) => (<PostItem post={post} key={post._id}/>))}
                        </Well>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
      data:state.listtoggle.data,
      categoryName:state.listtoggle.categoryName
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(collectionPost);
