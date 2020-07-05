import React from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';

export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void
}

const LoginForm = (props: LoginFormProps) => {

  const yup = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Required'),
    password: Yup.string()
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: yup,
    onSubmit: (values, { setSubmitting }) => {
      props.onSubmit(values.email, values.password);
      setSubmitting(false);
    }
  });

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <p>Errors: {JSON.stringify(formik.errors, null, 2)}</p>
      <Form.Group controlId="formEmail">
        <Form.Label>Email :</Form.Label>
        <Form.Control
          type="text"
          name="email"
          placeholder="Enter email..."
          {...formik.getFieldProps('email')}
          isInvalid={!!formik.errors.email}/>
        {/*&& formik.touched.email}/>*/}
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password :</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter password..."
          {...formik.getFieldProps('password')}
          isInvalid={!!formik.errors.password}/>
        {/*&& formik.touched.password}/>*/}
        <Form.Control.Feedback type="invalid">
          {formik.errors.password}
        </Form.Control.Feedback>

      </Form.Group>

      <Button type="submit" disabled={!formik.isValid}>
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
