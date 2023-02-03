import logo from "./logo.svg";
import { useState } from "react";
import "./style/LogIn.css";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Form, Input, Button, Modal, Typography } from "antd";
import { UserOutlined, LockOutlined, ImportOutlined } from "@ant-design/icons";
//var md5 = require("md5");
import * as md5 from 'md5'


const { Title } = Typography;

function LogIn() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [modalContent, setModalContent] = useState("");

  const out = useSelector((state) => state);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const userLogIn = () => {
    if (userId.length === 0 && userPw.length === 0) {
      setModalContent("Please enter ID and Password");
      setOpen(true);

      return;
    } else if (userId.length === 0) {
      setModalContent("Please enter ID");
      setOpen(true);

      return;
    } else if (userPw.length === 0) {
      setModalContent("Please enter Password");
      setOpen(true);

      return;
    }


    axios
      .get(
        `/rss/api/auths/login?username=${userId}&password=${md5(userPw)}`,
      )
      .then((res) => {
        console.log(res)
        navigate('/main');
      })
      .catch((error) => {
        console.error(error);
      });

    
  };

  return (
    <div className="App">
      <div className="formWrapper">
        {/* <p>나의 몸무게는 {out}</p> <Button>My first Button</Button> */}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Title>Rapid Collector</Title>
          <Form.Item name="username" style={{ marginBottom: "10px" }}>
            <Input
              id="input"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="ID"
              onChange={(e) => setUserId(e.target.value.trim())}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "10px" }}>
            <Input.Password
              id="input"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              onChange={(e) => setUserPw(e.target.value.trim())}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={userLogIn}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Modal
        open={open}
        title="Error"
        onCancel={handleCancel}
        footer={[
          <Button key="back" type="primary" onClick={handleCancel}>
            Ok
          </Button>,
        ]}
      >
        <p>{modalContent}</p>
      </Modal>
    </div>
  );
}

export default LogIn;
