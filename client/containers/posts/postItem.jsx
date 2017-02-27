import React, {PropTypes, Component} from 'react';
import { Link } from 'react-router';
import {Media, Label, Button} from 'react-bootstrap';
import PostEdit from '../../containers/posts/postEdit';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router';
import ListModel from '../listCollection/listModel';

class PostItem extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
            listShow:false,
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.trimDescription = this.trimDescription.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.closeListModal = this.closeListModal.bind(this);
        this.handleVote = this.handleVote.bind(this);
        // this.handleClick = this.handleClick.bind(this);
    }

    openModal(e) {
        e.preventDefault();
        this.setState({show: true});
        this.props.getAllCategory();
    }
    handleSave(){
      this.props.getList(Meteor.userId());
      this.setState({listShow: true});
    }
    closeModal() {
        this.setState({show: false});
    }
    closeListModal(){
      this.setState({listShow: false});
    }

    trimDescription() {
      console.log(this.props.post.body.substring(0, 100));
      return this.props.post.body.substring(0, 100);
    }

    handleVote(e) {
      e.preventDefault();
      this.props.vote(this.props.post._id);
    }
    // handleClick(e) {
    //   e.preventDefault()
    //   this.props.getPost(this.props.post._id);
    //   browserHistory.push('/post/' + this.props.post.slug);
    // }

    render() {
        let image,
            status,
            editLink, url = '/posts/' + this.props.post._id + '/' + this.props.post.slug,
            description = this.props.post.body ? this.props.post.body.substring(0, 200) : '';
        if (Meteor.userId() === this.props.post.userId || Roles.userIsInRole(Meteor.userId(), Constant.ROLES.ADMIN, Constant.ROLES.GROUP)) {
            editLink = (
                <Button bsSize="xs" onClick={this.openModal}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;</Button>
            )
        }

        var listButton = (
              <Button onClick={this.handleSave} bsSize="xs">Save</Button>
          )
        if (this.props.post.imageUrl) {
            image = <img width={100} height={100} src={this.props.post.imageUrl}/>
        }
        if (this.props.post.status == Constant.STATUS.PENDING) {
            status = <Label bsStyle="warning">{this.props.post.status}</Label>
        }

        return (
            <div>
                <Media>
                    <Media.Left>
                        {image}
                    </Media.Left>
                    <Media.Body>
                        <Media.Heading>
                            <Link to={url}>{this.props.post.title}</Link>
                        </Media.Heading>
                        <p>{description}</p>
                        <p>{this.props.post.author}</p>
                        <Button bsSize="xs" onClick={this.handleVote}>
                            <i className="fa fa-arrow-up" aria-hidden="true"></i>&nbsp;{this.props.post.votes}</Button>
                        &nbsp;
                        <Button bsSize="xs">
                            <i className="fa fa-comment-o" aria-hidden="true"></i>&nbsp;45</Button>
                        &nbsp; {editLink}
                        &nbsp; {listButton}
                        &nbsp; {status}
                    </Media.Body>
                </Media>
                <hr/>
                <PostEdit showModal={this.state.show} post={this.props.post} closeModal={this.closeModal}/>
                <ListModel showModal={this.state.listShow} post={this.props.post} closeListModal={this.closeListModal} />
            </div>
        )
    }
}

PostItem.propTypes = {
    post: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    Meteor.subscribe('votes');
    return {categories: state.categoryReducer.category_getAll}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
