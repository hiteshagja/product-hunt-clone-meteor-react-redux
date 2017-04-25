import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {Grid, Well, Row, Col, Image} from 'react-bootstrap';
import PostItem from '../posts/postItem';

class collectionPost extends Component {
    componentWillMount() {
        if (this.props.params.collection) {
            this.props.singleListData(this.props.params.collection);
        }
    }

    render() {
        let name,
            author,
            picture,
            noData,
            posts = [],
            post;
        if (Object.keys(this.props.data).length > 0) {
            name = this.props.data.name;
            author = this.props.data.author;
            picture = this.props.data.picture;
            posts = this.props.data.posts;
        }

        if(posts.length==0||posts[0]==null){
          noData = <h5>Collection is empty</h5>;
        }else{
          post = posts.map((post,index) => (<PostItem post={post} key={index}/>));
        }


        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <Well className="collectionName">
                            <p style={{
                                fontSize: "24px"
                            }}>{name}</p>
                            <p><Image src={picture} width={30} height={30} circle/>&nbsp; by -{author}</p>
                        </Well>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Well className="navbar-default">
                            {noData}
                            {post}
                        </Well>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {data: state.listtoggle.data}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(collectionPost);
