import React, { useState } from 'react';
import { login } from '../services/auth.service';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../components/MyTextInput';

const Login = (props) => {
  const [message, setMessage] = useState('');
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
                  () => {
                    props.history.push('/');
                    window.location.reload();
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
                  <div className="alert alert-danger mt-3" role="alert">
                    {message}
                  </div>
                )}
                <MyTextInput label="Username" name="username" type="text" />
                <MyTextInput label="Password" name="password" type="text" />
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
