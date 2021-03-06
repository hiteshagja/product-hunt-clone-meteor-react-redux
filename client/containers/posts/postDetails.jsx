import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {ActionCreators} from '../../actions';
import {bindActionCreators} from 'redux';
import {Grid, Well, Row, Col} from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import PostItem from './postItem';
import CommentListing from '../comments/commentListing';
import CommentAdd from '../comments/commentAdd';

class PostDetails extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
      this.props.getPost(this.props.params.id);
      this.props.getPostComments(this.props.params.id);
    }



    render() {
      let images = [

   ]
      var imagelength = this.props.post.postImagesUrl;

      if(this.props.post.postImagesUrl){
        for (var i = 0; i < imagelength.length; i++) {
           images.push({original:this.props.post.postImagesUrl[i],thumbnail:this.props.post.postImagesUrl[i]})
        }
      }

        let commentList,
            newComment;
        if (Object.keys(this.props.post).length > 0) {
            commentList = <CommentListing post={this.props.post} post_comments={this.props.post_comments} />
            newComment = this.props.userId ? <CommentAdd post={this.props.post}/> : '';
        }

        return (
            <Grid>
                <Row>
                    <Col md={12}>
                        <Well className="single-post-detail">

                            <PostItem post={this.props.post}/>
                            <p>{this.props.post.body}</p>
                            <div className="Images text-center">
                              <div style={{width:600}}>
                                <ImageGallery
                                   items={images}
                                   slideInterval={2000}
                                   showFullscreenButton={false}
                                   showPlayButton={false}
                                   />
                                </div>
                              </div>
                        </Well>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {commentList}
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {newComment}
                    </Col>
                </Row>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {userId: state.signInReducer.userId, post: state.postReducer.post_get, post_comments: state.commentReducer.post_comments}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
