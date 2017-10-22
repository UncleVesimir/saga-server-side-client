import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchMessage } from '../actions';


class Feature extends Component {
  componentWillMount(){
    this.props.fetchMessage();
  }
  render(){
    return (
     <div>
       <h2>Feature page</h2>
       <h4>{this.props.message || "Somethin fucky"}</h4>
     </div>
   )
  }
  
}

function mapStateToProps(state){
  return {
    message : state.message.message
  }
}

export default connect(mapStateToProps, {fetchMessage})(Feature);