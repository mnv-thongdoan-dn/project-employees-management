import React from 'react';
import { Form, Input, Select, Radio, Button, InputNumber } from 'antd';
import { FileImageOutlined, UserOutlined, NumberOutlined, MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';

const { Option } = Select;

const positions = [
  {id: 1, value: "Intern"},
  {id: 2, value: "Fresher"},
  {id: 3, value: "Junior"},
  {id: 4, value: "Senior"},
  {id: 5, value: "Leader"},
];

const languages = [
  {id: 1, value: "Php"},
  {id: 2, value: "Ruby"},
  {id: 3, value: "Javascript"},
  {id: 4, value: "Java"},
  {id: 5, value: "C++"},
];

const frameworks = [
  {id: 1, value: "React"},
  {id: 2, value: "Vue"},
  {id: 3, value: "Laravel"},
  {id: 4, value: "Angular"},
  {id: 5, value: "C++"},
];

const CreateEmployees = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  // const onChangePhone = (e) => {
  //   console.log(e.target.value)
  // }

  return (
    <div className='wrapper-form'>
      <h1 className='title-form'>Create Employee Form</h1>
      <Form
        name="create-form"
        className='create-employee-form'
        labelCol={{ span: 24}}
        wrapperCol={{ span: 24 }}
        initialValues={{
          avatar: '',
          gender: "male",
          prefixSelector: '86'
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Avatar"
          name="avatar"
          hasFeedback={true}
          rules={[
            { required: true, message: 'Please input link avatar!' },
            { max: 300 }
          ]}
        >
          <Input 
            prefix={<FileImageOutlined className="site-form-item-icon" />} 
            placeholder="Link avatar" 
          />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="name"
          hasFeedback={true}
          rules={[
            { required: true, message: 'Please input Full Name!' },
            { max: 30 },
            { min: 10 },
          ]}
        >
          <Input 
            prefix={<UserOutlined className="site-form-item-icon" />} 
            placeholder="Full Name" 
          />
        </Form.Item>

        <Form.Item
          label="Age"
          name="age"
          hasFeedback={true}
          rules={[
            { required: true, message: 'Please input age!' }
          ]}
        >
          <InputNumber
            min={18}
            max={65}
            prefix={<NumberOutlined className="site-form-item-icon"/>}
            placeholder="Age" 
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          hasFeedback={true}
        >
          <Radio.Group>
            <Radio value='male'>Male</Radio>
            <Radio value='female'>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Position"
          name="position"
          hasFeedback={true}
          rules={[
            { required: true, message: 'Please choose a position!' }
          ]}
        >
          <Select 
            placeholder="choose a position"
          >
            {
              positions && positions.map((position) => {
                return (
                  <Option key={position.id} value={position.value}>{position.value}</Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Language"
          name="language"
          hasFeedback={true}
          rules={[
            { required: true, message: 'Please choose a language!' }
          ]}
        >
          <Select
           placeholder="choose a language"
          >
            {
              languages && languages.map((language) => {
                return (
                  <Option key={language.id} value={language.id}>{language.value}</Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="FrameWork"
          name="frameWork"
          hasFeedback={true}
          rules={[
            { required: true, message: 'Please choose a frameWork!' }
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            optionLabelProp="label"
            placeholder="You can choose many framework"
            // onChange={getValueLanguages}
          >
            {
              frameworks && frameworks.map((item) => {
                return  (
                  <Option key={item.id} value={item.value} label={item.value}>
                  <div className="demo-option-label-item">
                    {item.value}
                  </div>
                </Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          hasFeedback={true}
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder='Email!' />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input phone number!' },
            { min: 10 },
            { max: 12 }
          ]}
        >
          <Input 
            prefix={<PhoneOutlined className="site-form-item-icon" />}
            placeholder="Phone Number" 
          />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          hasFeedback={true}
          rules={[
            { required: true, message: 'Please input address!' },
            { min: 10 },
            { max: 100 }
          ]}
        >
          <Input 
            prefix={<HomeOutlined className="site-form-item-icon" />} 
            placeholder="Address" 
          />
        </Form.Item>

        <Form.Item
          label="CV"
          name="cv"
          hasFeedback={true}
          rules={[
            { required: true, message: 'Please input your file CV!' },
            { max: 100 }
          ]}
        >
          <Input 
            prefix={<FileImageOutlined className="site-form-item-icon" />} 
            placeholder="Link CV" 
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
        >
          <div className='group-btn'>
            <Button className='btn btn-secondary' htmlType="button">
              Cancel
            </Button>
            <Button className='btn btn-primary' htmlType="submit">
              Create
            </Button>
          </div>
        </Form.Item>

      </Form>
    </div>
  )
}

export default CreateEmployees;
