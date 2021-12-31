import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';

import { signin, authenticate, isAuthenticated } from '../auth';

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (event, name) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        return;
      }
      authenticate(data, () => {
        setValues({ ...values, redirectToReferrer: true });
      });
    });
  };

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className='alert alert-info'>
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }
  };

  const signinForm = () => (
    <form>
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

      <button className='btn btn-primary' onClick={clickSubmit}>
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title='Signin'
      description='Signin to Node React E-commerce App'
      className='container col-md-8 offset-md-2'
    >
      {showError()}
      {showLoading()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Signin;
