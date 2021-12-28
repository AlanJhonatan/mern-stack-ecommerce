import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';

import { signup } from '../auth';

const Signup = () => {
  const [ values, setValues ] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, success, error } = values;

  const handleChange = (event, name) => {
    setValues({...values, error: false, [name]: event.target.value});
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({name, email, password})
    .then(data => {
      if(data.error) {
        setValues({...values, error: data.error, success: false});
        return;
      }

      setValues({
        ...values,
        name: '',
        email: '',
        password: '',
        error: '',
        success: true,
      })
    })
  }

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none'}}>
      { error }
    </div>
  );

  const showSuccess = () => (
    <div className="alert alert-info" style={{ display: success ? '' : 'none'}}>
      New account is created ! Please, <Link to="/signin">signin.</Link>
    </div>
  );

  const signUpForm = () => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>Name</label>
        <input
          type='text'
          onChange={(event) => handleChange(event, 'name')}
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          type='email'
          onChange={(event) => handleChange(event, 'email')}
          className='form-control'
        />
      </div>

      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          type='password'
          onChange={(event) => handleChange(event, 'password')}
          className='form-control'
        />
      </div>

      <button
        className='btn btn-primary'
        onClick={clickSubmit}
      >
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title='Signup'
      description='Signup to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
}

export default Signup;