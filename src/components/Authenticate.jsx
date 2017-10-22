import React, { Component } from 'react'
import { connect } from 'react-redux';

export default function Authenticate (ComposedComponent){

  class AuthProtected extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }


    render() {
      return (
        <ComposedComponent {...this.props} />
      )
    }

    componentWillMount() {
      if(!this.props.authenticated){
        this.context.router.history.push('/');
      }
    }
    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated){
        this.context.router.history.push('/');
      }
    }

  }

 function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    }
  }

  return connect(mapStateToProps, null)(AuthProtected);

}