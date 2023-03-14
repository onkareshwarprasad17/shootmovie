import { Button, Col, Form, Input, message, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/context';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useContext(AuthContext);
  let redirectPath = location.state?.path || '/home';

  const getLoginToken = async (loginData) => {
    if (navigator.onLine) {
      try {
        let response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
        if (!response.ok) {
          throw new Error('unauthorized');
        }
        let data = await response.json();
        console.log(response);
        return data.token;
      } catch (error) {
        return error.message;
      }
    } else {
      location.reload();
    }
  };

  const submitLogin = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };

    const token = await getLoginToken(data);
    if (token === 'unauthorized') {
      auth.login(null);
      message.error('Invalid username or password!');
    } else {
      localStorage.setItem('user', token);
      auth.login(token);
      message.success('Login Successful!');
      navigate(redirectPath, { replace: true });
    }
  };

  const submitErrorHandler = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <>
      <Row align="middle" justify={'center'} className="login-container">
        <Col
          sm={{ span: 16 }}
          md={{ span: 12 }}
          lg={{ span: 10 }}
          xl={{ span: 8 }}
        >
          <div className="login-modal">
            <div className="inputField">
              <Typography.Title level={3} className="login-modal-heading">
                Welcome to SHOOTMovie!
              </Typography.Title>
              <Typography.Title level={5} className="login-modal-subHeading">
                Please login to continue...
              </Typography.Title>
            </div>
            <Row justify="center">
              <Col span={18}>
                <Form
                  name="login"
                  onFinish={(e) => submitLogin(e)}
                  onFinishFailed={submitErrorHandler}
                  autoComplete="off"
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: 'Username is required!',
                      },
                    ]}
                  >
                    <Input className="userInput" placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Password is required!',
                      },
                    ]}
                  >
                    <Input.Password
                      className="passwordInput"
                      placeholder="Password"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      className="loginButton"
                      type="primary"
                      htmlType="submit"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Login;
