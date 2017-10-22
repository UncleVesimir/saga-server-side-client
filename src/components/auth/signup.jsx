import React, { Component } from 'react';
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form';
import { dispatchSignupRequest } from '../../actions'

class SignUp extends Component {

  handleFormSubmit = (formProps) => {
    this.props.dispatchSignupRequest(formProps);
  };

  renderAlert = () => {
    if(this.props.authError){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.authError}
        </div>
      )
    }
  }

  renderField = ({input, label, type, meta:{touched, error}}) => {
    return (
      <div>
      <label htmlFor={input.name}>{label}</label>
      <input 
      className="form-control"
      id={input.name}
      type={type}
      {...input}/>
      {touched && error && <span className="error">{error}</span>}
    </div>
    )
  }



  render(){
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
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
      <Field className="form-control"
        label = "Confirm Password"
        name= "passwordConfirm"
        type = "password"
        component = {this.renderField}
        />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">Sign Up</button>
    </form>
    )
  }
}


function validate (formProps) {
  let errors = {};
  if(!formProps.email){
    errors.email = "Email required"
  }
  if(!formProps.password){
    errors.password = "Password required"
  }
  if(!formProps.passwordConfirm){
    errors.passwordConfirm = "Please confirm your password"
  }
  if(formProps.passwordConfirm !== formProps.password){
    errors.passwordConfirm = "Your Passwords must match"
  }

  return errors;
}


function mapStateToProps(state){
  return {authError:state.auth.error}
}

export default reduxForm(
  {
    form: 'signup',
    validate
  })(connect(mapStateToProps, { dispatchSignupRequest })(SignUp));