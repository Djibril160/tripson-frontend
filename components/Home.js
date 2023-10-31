import styles from '../styles/Home.module.css';
import React, { useState } from 'react';
import { DownloadOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone, PushpinTwoTone } from '@ant-design/icons';
import { Button, Radio, Space, Divider, Input, Card } from 'antd';

function Home() {
  const [size, setSize] = useState('large'); // default is 'middle'
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [city, setCity] = useState(null);

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
            />
            <Input 
              className='w-100 text-center' 
              size="large" 
              placeholder="City" 
              prefix={<PushpinTwoTone />}
            />
            <Space direction="horizontal">
              <Input.Password
                className='w-100 text-center'
                size="large"
                placeholder="Password"
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
              // onClick={}
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
