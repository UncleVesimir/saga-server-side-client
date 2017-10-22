import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { dispatchLoginRequest } from '../../actions';

class Signin extends Component {

  renderField = ({input, label, type, meta:{touched, error}}) => {
    return (
      <div>
        <label htmlFor={input.name}>{label}</label>
        <input 
        className="form-control"
        id={input.name}
        type={type}
        {...input}/>
      </div>
    )
  }

  renderAlert = () => {
    if(this.props.authError){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.authError}
        </div>
      );
    }
  }

  onSubmit = ({email, password}) =>{
    this.props.dispatchLoginRequest(email, password);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field className="form-control"
          label = "Email"
          name= "email"
          type = "text"
          component = {this.renderField}
          />
        <Field className="form-control"
          label = "Password"
          name= "password"
          type = "password"
          component = {this.renderField}
          />
          {this.renderAlert()}
          <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    )
  }
}

function mapStateToProps(state){
  return {authError:state.auth.error}
}

export default reduxForm({
  form: 'signin'
})(connect(mapStateToProps, { dispatchLoginRequest })(Signin))