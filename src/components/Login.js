import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import React, { useContext } from "react";
import users from "../assets/userDetails.json";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/context";

const Login = () => {
  const userDetails = users.users;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const getLoginToken = async (loginData) => {
    return fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("unauthorized");
      })
      .then((data) => data.token)
      .catch((error) => {
        return error.message;
      });
  };

  const submitLogin = async (values) => {
    const data = {
      username: values.username,
      password: values.password,
    };

    const token = await getLoginToken(data);
    if (token === "unauthorized") {
      auth.login(null);
      message.error("Invalid username or password!");
    } else {
      message.success("Login Successful!");
      auth.login(token);
      navigate("/");
    }
  };

  const submitErrorHandler = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <>
      <Row align="middle" justify={"center"} className="login-container">
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
                        message: "Username is required!",
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
                        message: "Password is required!",
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
