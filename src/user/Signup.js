import React, { useState } from 'react';

import Layout from '../core/Layout';
// import { API } from '../config';

const Signup = () => {
  const [ values, setValues ] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const handleChange = (event, name) => {
    setValues({...values, error: false, [name]: event.target.value});
  }

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

      <button className='btn btn-primary'>
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
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  );
}

export default Signup;