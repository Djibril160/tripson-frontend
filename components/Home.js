import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { login, logout } from '../reducers/user';
import {  UserOutlined, PushpinTwoTone } from '@ant-design/icons';
import { Button, Radio, Space, Divider, Input, Card } from 'antd';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [size, setSize] = useState('large'); // default is 'middle'
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [signupUsername, setSignupUsername] = useState(null);
  const [signupPassword, setSignupPassword] = useState(null);
  const [city, setCity] = useState(null);

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
      }
    });
  }; 

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My World!
        </h1>
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
            <Button
              className='w-100 text-center'
              type="primary"
              onClick={ () => handleSignup()}
            >
              Sign up
            </Button>
          </Space>
        </Card>
      </main>
    </div>
  );
}

export default Home;
