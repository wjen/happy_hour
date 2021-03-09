import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../components/MyTextInput';

const Login = (props) => {
  const { login, message, setMessage, successful } = useContext(AuthContext);
  return (
    <section className="register">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <h1 className="text-center mb-3">Login</h1>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={Yup.object({
                username: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('Required'),
                password: Yup.string()
                  .max(20, 'Must be no more than 20 characters')
                  .required('Required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                login(values.username, values.password).then(
                  (response) => {
                    props.history.push('/');
                  },
                  (error) => {
                    const resMessage =
                      error.response &&
                      error.response.data &&
                      error.response.data.message;

                    setSubmitting(false);

                    setMessage(resMessage);
                  }
                );
              }}
            >
              <Form>
                {message && (
                  <div
                    className={
                      successful ? 'alert alert-success' : 'alert alert-danger'
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                )}
                <MyTextInput label="Username" name="username" type="text" />
                <MyTextInput label="Password" name="password" type="password" />
                <button type="submit" className="btn btn-info">
                  Login
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
