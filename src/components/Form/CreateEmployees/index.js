import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Radio, Button, InputNumber } from 'antd';
import { 
  FileImageOutlined, 
  UserOutlined, 
  NumberOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  HomeOutlined 
} from '@ant-design/icons';
import Notification from '../../common/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { employeesSelector } from '../../../store/selectors';
import { positionsThunk } from '../../../store/slices/positionsSlice';
import { languagesThunk } from '../../../store/slices/languagesSlice';
import { frameWorksThunk } from '../../../store/slices/frameworksSlice';
import { EmployeesCreateThunk } from '../../../store/slices/employeesSlice';
import { unwrapResult } from '@reduxjs/toolkit';

const { Option } = Select;

const CreateEmployees = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector(employeesSelector);
  const [ positions, setPositions ] = useState([]);
  const [ languages, setLanguages ] = useState([]);
  const [ frameWorks, setFrameWorks ] = useState([]);
  const [ selectedlanguage, setSelectedLanguage ] = useState(1);
  const initialValues= {
    avatar: '',
    name: '',
    age: '',
    gender: 'male',
    positions: '',
    language: 'Php',
    frameWorks: [],
    email: '',
    phoneNumber: '',
    address: '',
    cv: ''
  };

  useEffect(() => {
    const getPositions = async () => {
      const result = await dispatch(positionsThunk());
      setPositions(unwrapResult(result));
    }

    const getlanguages = async () => {
      const result = await dispatch(languagesThunk());
      setLanguages(unwrapResult(result));
    }

    getPositions();
    getlanguages();
  }, [])

  useEffect(() => {
    const getFrameWorks = async () => {
      const result = await dispatch(frameWorksThunk(selectedlanguage));
      const dataFrameWorks = unwrapResult(result)[0].values;
      setFrameWorks(dataFrameWorks)
    }
    getFrameWorks();
  }, [selectedlanguage])

  const handleOnChangeSelect = (value) => {
    setSelectedLanguage(value);
  }

  const onFinish = (values) => {
    const addEmployees = async () => {
      const result = await dispatch(EmployeesCreateThunk(values));
      if(result.meta.requestStatus === "fulfilled") {
        Notification('success', "Employees Message", "Create Employees Success!")
        setTimeout(() => {
          navigate("/dashboard/employees");
        }, [2000])
      }
    }
    addEmployees();
  };

  return (
    <div className='wrapper-form'>
      <h1 className='title-form'>Create Employee Form</h1>
      <Form
        name="create-form"
        className='create-employee-form'
        labelCol={{ span: 24}}
        wrapperCol={{ span: 24 }}
        initialValues={initialValues}
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
           onChange={handleOnChangeSelect}
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
          label="FrameWorks"
          name="frameWorks"
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

          >
            {
              frameWorks && frameWorks.map((item) => {
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
          name="phoneNumber"
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
            <Button loading={isLoading} className='btn btn-primary' htmlType="submit">
              Create
            </Button>
          </div>
        </Form.Item>

      </Form>
    </div>
  )
}

export default CreateEmployees;
