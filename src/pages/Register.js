import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../components/MyTextInput';

const Register = (props) => {
  const { register, alert, setAlert } = useContext(AuthContext);

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
                    props.history.push('/login');
                    setAlert({
                      show: true,
                      msg: response.data.message,
                      type: 'success',
                    });
                  },
                  (error) => {
                    console.log(error.response.data.message);
                    const resMessage =
                      error.response &&
                      error.response.data &&
                      error.response.data.message;

                    setSubmitting(false);
                    setAlert({ show: true, msg: resMessage, type: 'danger' });
                  }
                );
              }}
            >
              <Form>
                {/* Flash Message  */}
                {alert.show && (
                  <div className={`alert alert-${alert.type}`} role="alert">
                    {alert.msg}
                  </div>
                )}
                <MyTextInput label="Username" name="username" type="text" />
                <MyTextInput label="Email" name="email" type="email" />
                <MyTextInput label="Password" name="password" type="password" />
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
