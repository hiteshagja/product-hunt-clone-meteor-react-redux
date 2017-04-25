import React, {Component, PropTypes} from 'react';
import {Panel, Checkbox} from 'react-bootstrap';
import {connect} from 'react-redux'
import {ActionCreators} from '../../actions'
import {bindActionCreators} from 'redux';
import { Link, browserHistory } from 'react-router';


class AdminCollectionItem extends Component {
      handleCardClick(data){
        browserHistory.push('/@'+this.props.collection.userSlug+'/collection/'+data);
      }
      render() {
        const {collection} = this.props;
        const bgImage = {
            backgroundImage: "url(" + collection.imagePath + ")"
        }

        return (
            <Panel onClick={()=>{this.handleCardClick(collection.slug)}} className="adminCollectionDiv" style={bgImage}>
                  <h4>{collection.name}
                  </h4>
                  <hr/>
                  <p>
                     {collection.description}
                  </p>
            </Panel>
        )
    }
}

AdminCollectionItem.propTypes = {
    collection: PropTypes.object
}

function mapStateToProps(state, props) {
    return {role: state.signInReducer.role}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCollectionItem);
