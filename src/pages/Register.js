import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../components/MyTextInput';

const Register = (props) => {
  const [message, setMessage] = useState('');
  const [successful, setSuccessful] = useState(false);

  const { register } = useContext(AuthContext);

  return (
    <section className="register">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <h1 className="text-center mb-3">Register</h1>
            <Formik
              initialValues={{ username: '', email: '', password: '' }}
              validationSchema={Yup.object({
                username: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('Required'),
                email: Yup.string()
                  .max(40, 'Must be no more than 40 characters')
                  .required('Required'),
                password: Yup.string()
                  .max(20, 'Must be no more than 20 characters')
                  .required('Required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                register(values.username, values.email, values.password).then(
                  (response) => {
                    console.log(response);
                    setSubmitting(false);
                    setSuccessful(true);
                    setMessage(response.data.message);
                  },
                  (error) => {
                    console.log(error.response.data.message);
                    const resMessage =
                      error.response &&
                      error.response.data &&
                      error.response.data.message;

                    setSubmitting(false);
                    setSuccessful(false);
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
                <MyTextInput label="Email" name="email" type="email" />
                <MyTextInput label="Password" name="password" type="text" />
                <button type="submit" className="btn btn-info">
                  Register
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
