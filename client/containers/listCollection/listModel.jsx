import React, {PropTypes, Component} from 'react';
import {NavItem} from 'react-bootstrap';
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


class CustomButton extends Component{
  constructor(){
    super();
    this.listSelect = this.listSelect.bind(this);
  }

  listSelect(listId,post){
    this.props.updateList(listId,post._id);
  }

  render(){
    return(
      <Button onClick={()=>{this.listSelect(this.props.data._id,this.props.post)}}>{this.props.data.name}</Button>
    );
  }
}

class ListModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addlist:false,
        }
        this.signInWithFacebook = this.signInWithFacebook.bind(this);
        this.signInWithTwitter = this.signInWithTwitter.bind(this);
        this.addNewList = this.addNewList.bind(this);
        this.handleAddNewList = this.handleAddNewList.bind(this);
    }

    signInWithFacebook(e) {
        e.preventDefault();
        this.props.signInWithFacebook();
        this.props.toggleSignInModal(false);
    }

    signInWithTwitter(e) {
        e.preventDefault();
        this.props.signInWithTwitter();
        this.props.toggleSignInModal(false);
    }
    addNewList(){
        this.setState({addlist:true});
    }
    handleAddNewList(e){
      e.preventDefault();
      listname  = ReactDOM.findDOMNode(this.refs.listname).value;
      postId = this.props.post._id;
      this.props.addList(listname,postId);
      this.props.getList(Meteor.userId());
      this.setState({addlist:false});
    }

    render() {
      const listData = this.props.listData;
        const buttonStyles = {
            maxWidth: 350,
            margin: '0 auto 15px'
        };
        if(Meteor.userId()){
          if(this.state.addlist){
            addlist = <Form inline>
                        <FormGroup controlId="formInlineName">
                          {' '}
                          <FormControl ref="listname" type="text" placeholder="new lists name" />
                        </FormGroup>
                        {' '}
                        {' '}
                        <Button onClick={this.handleAddNewList} type="submit">
                          Add
                        </Button>
                      </Form>;
          }else{
          addlist = <Button onClick={this.addNewList} bsStyle="link">Link</Button>
          }
          return (
              <Modal show={this.props.showModal} bsSize="large" aria-labelledby="contained-modal-title-sm" onHide={() => {
                this.setState({addlist:false});  this.props.closeListModal();
              }}>
                  <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-sm">List</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        {addlist}
                        {listData.map((data, index) => (<CustomButton data={data} key={index} post={this.props.post} updateList={this.props.updateList} />))}
                  </Modal.Body>
              </Modal>
          )
        }else{
          return (
              <Modal show={this.props.showModal} bsSize="small" aria-labelledby="contained-modal-title-sm" onHide={() => {
                  this.props.closeListModal()
              }}>
                  <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-sm">SignIn</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <div style={buttonStyles}>
                          <Button bsStyle="primary" bsSize="large" block onClick={this.signInWithFacebook}>Facebook</Button>
                          <Button bsStyle="info" bsSize="large" block onClick={this.signInWithTwitter}>Twitter</Button>
                      </div>
                  </Modal.Body>
              </Modal>
          )
        }

    }
}

ListModel.propTypes = {
    showSignInModal: PropTypes.bool,
    facebook: PropTypes.string,
    twitter: PropTypes.string,
    listtoggle:PropTypes.bool
};

function mapStateToProps(state) {
    return {
      showSignInModal: state.signInReducer.signIn_toggle,
      facebook: state.signInWithFacebook,
      twitter: state.signInWithTwitter,
      listData:state.listtoggle.list_data
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListModel);
