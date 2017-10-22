import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dispatchLogoutRequest } from '../../actions';

class SignOut extends Component {

  componentWillMount(){
    this.props.dispatchLogoutRequest();
  }

  render() {
    return (
      <div>Sorry to see you go...</div>
    )
  }
};


export default connect(null, { dispatchLogoutRequest })(SignOut);