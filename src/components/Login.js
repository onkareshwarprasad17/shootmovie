import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import users from "../assets/userDetails.json";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./context/context";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../appSlice";

const Login = () => {
  const userDetails = users.users;
  const navigate = useNavigate();
  const loggedIn = useContext(AppContext);
  const dispatch = useDispatch();

  const submitHandler = (values) => {
    // username and password
    try {
      let flag = false;
      let isUser = false;
      userDetails.forEach((user) => {
        if (values.username === user.username) {
          if (values.password === user.password) {
            flag = true;
            isUser = true;
          } else {
            isUser = true;
            submitErrorHandler("Please check your password!");
          }
        }
      });
      if (flag) {
        message.success("Login Succesful!");
        dispatch(userLoggedIn());
        navigate("/home");
      }
      if (isUser === false) {
        submitErrorHandler("Username mentioned is not registered");
      }
    } catch (error) {
      submitErrorHandler(error);
    }
  };

  const submitErrorHandler = (errorInfo) => {
    message.error(errorInfo);
  };

  return (
    <>
      {!loggedIn && (
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
                    onFinish={submitHandler}
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
      )}
    </>
  );
};

export default Login;
