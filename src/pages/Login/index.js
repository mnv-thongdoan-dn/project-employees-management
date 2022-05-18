import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import BannerLogin from '../../assets/images/banner-signin.jpg';
import { authSelector } from '../../store/selectors';
import useAuth from '../../hooks/Auth';

const Login = () => {
  const { login } = useAuth()
  const {isLoading} = useSelector(authSelector);

  const onFinish = (values) => {
    login(values);
  };
  
  return (
    <div className='page-home'>
      <Row justify='center' className='page-home-wrapper'>
        <Col lg={12} className='banner-login'>
          <img src={BannerLogin} alt='banner-login'/>
        </Col>
        <Col xs={24} sm={18} lg={12} className='contents'>
          <p className='page-title'>Monstar-lab Employees Management</p>
          <h2 className='form-title'>Sign In</h2>
          <Form
            name="login-form"
            labelCol={{ span: 24}}
            wrapperCol={{ span: 24 }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="UserName"
              name="userName"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
                { whitespace: true},
                { min: 6 },
                { max: 15 }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Username" 
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              hasFeedback={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                { whitespace: true},
                { min: 4 },
                { max: 10 }
              ]}
            >
              <Input.Password  
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password" 
              />
            </Form.Item>

            <Form.Item
              name="remember"
              hasFeedback={true}
              valuePropName="checked"
              wrapperCol={{ span: 24 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 24 }}
            >
              <Button loading={isLoading} className='btn' type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}


export default Login;
