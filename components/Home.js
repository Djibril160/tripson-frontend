import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { login, logout } from '../reducers/user';
import {  UserOutlined, PushpinTwoTone } from '@ant-design/icons';
import { Button, Radio, Space, Divider, Input, Card, Modal, Flex } from 'antd';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [signupUsername, setSignupUsername] = useState(null);
  const [signupPassword, setSignupPassword] = useState(null);
  const [city, setCity] = useState(null);
  const [loginUsername, setLoginUsername] = useState(null);
  const [loginPassword, setLoginPassword] = useState(null);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  // function to create a new user
  const handleSignup = () => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username: signupUsername, password: signupPassword, city: city})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // if signup successfully, token is sent
      if (data && data.token) {
        // stock token in reducer
        dispatch(login({ token: data.token }));
        setSignupUsername('');
        setSignupPassword('');
        setCity('');
        setOpen(false);
      }
    });
  }; 


  // function to create a new user
  const handleLogin = () => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username: loginUsername, password: loginPassword })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // if signup successfully, token is sent
      if (data && data.token) {
        // stock token in reducer
        dispatch(login({ token: data.token }));
        setLoginUsername('');
        setLoginPassword('');
      }
    });
  }; 


  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My World!
        </h1>


        {/* Login section  */}
        <Card
          style={{
            width: 400,
          }}
          className='card-login'>
          <Space direction="vertical" >
            <Input 
              className='w-100 text-center' 
              size="large" 
              placeholder="Username" 
              prefix={<UserOutlined />}
              onChange={(e) => setLoginUsername(e.target.value)}
              value={loginUsername}
            />
            <Space direction="horizontal">
              <Input.Password
                className='w-100 text-center'
                size="large"
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
                value={loginPassword}
                visibilityToggle={{
                  visible: passwordVisible,
                  onVisibleChange: setPasswordVisible,
                }}
              />
              <Button
                style={{
                  width: 80,
                }}
                size="large"
                onClick={() => setPasswordVisible((prevState) => !prevState)}
              >
                {passwordVisible ? 'Hide' : 'Show'}
              </Button>
            </Space>
            <Flex
              vertical
              gap="small"
              style={{
                width: '100%',
              }}
            >
              <Button
                className='w-100 text-center'
                type="primary"
                onClick={ () => handleLogin()}
              >
                Login
              </Button>
            </Flex>
          </Space>
        </Card>
        

        <Card
          style={{
            width: 400,
          }}
          className='card-login'>
          <Space direction="vertical" >
          <Flex
              vertical
              gap="small"
              style={{
                width: '100%',
              }}
            >
            </Flex>
            <Button 
              type="primary"
              className='w-100 text-center'
              onClick={showModal}>
              Create a new account
            </Button>
            <Modal
              open={open}
              title="Create a new user"
              onOk={() => handleSignup()}
              onCancel={handleCancel}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <Button
                    className='w-100 text-center'
                    type="primary"
                    onClick={ () => handleSignup()}
                  >
                    Validate
                  </Button> 
                </>
              )}
            >
              <Input 
                className='w-100 text-center' 
                size="large" 
                placeholder="Username" 
                prefix={<UserOutlined />}
                onChange={(e) => setSignupUsername(e.target.value)}
                value={signupUsername}
              />
              <Input 
                className='w-100 text-center' 
                size="large" 
                placeholder="City" 
                prefix={<PushpinTwoTone />}
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
              <Space direction="horizontal">
                <Input.Password
                  className='w-100 text-center'
                  size="large"
                  placeholder="Password"
                  onChange={(e) => setSignupPassword(e.target.value)}
                  value={signupPassword}
                  visibilityToggle={{
                    visible: passwordVisible,
                    onVisibleChange: setPasswordVisible,
                  }}
                />
                <Button
                  style={{
                    width: 80,
                  }}
                  size="large"
                  onClick={() => setPasswordVisible((prevState) => !prevState)}
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </Button>
              </Space>             
            </Modal>
          </Space>
        </Card>

      </main>
    </div>
  );
}

export default Home;
