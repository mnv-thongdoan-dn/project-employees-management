import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { 
  employeesSelector, 
  positionsSelector, 
  languagesSelector,
  frameWorksSelector
} from '../../../store/selectors';
import { positionsThunk } from '../../../store/slices/positionsSlice';
import { languagesThunk } from '../../../store/slices/languagesSlice';
import { frameWorksThunk } from '../../../store/slices/frameworksSlice';
import { employeeGetItemThunk, employeeUpdateThunk } from '../../../store/slices/employeesSlice';

const { Option } = Select;

const EditEmployees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [form] = Form.useForm()

  const { isLoading, status, employee } = useSelector(employeesSelector);
  const { positions } = useSelector(positionsSelector);
  const { languages } = useSelector(languagesSelector);
  const { frameWorks } = useSelector(frameWorksSelector);
  const [ selectedlanguage, setSelectedLanguage ] = useState('');

  useEffect(() => {
    dispatch(positionsThunk());
    dispatch(languagesThunk());
    dispatch(employeeGetItemThunk(params.id));
  }, [])

  useEffect(() => {
    form.setFieldsValue(employee);
    const convertLanguageId = (data = selectedlanguage) => {
      switch (data) {
        case "Php":
          return 1
          break;
  
        case "Ruby":
          return 2
          break;
  
        case "Javascript":
          return 3
          break;
  
        case "Java":
          return 4
          break;
  
        case "Python":
          return 5
          break;
  
        default:
          break;
      }
    }
    setSelectedLanguage(convertLanguageId(employee.language));
  }, [form, employee])

  useEffect(() => {
    if(selectedlanguage) {
      dispatch(frameWorksThunk(selectedlanguage));
    }
  }, [selectedlanguage])

  const handleOnChangeSelect = (value) => {
    console.log("values", value)
    setSelectedLanguage(value);
    form.setFieldsValue({frameWorks: []});
  }

  const onFinish = (values) => {
    console.log("values", values)
    dispatch(employeeUpdateThunk(values));
  }

  return (
    <div className='wrapper-form'>
      <h1 className='title-form'>Edit Employee</h1>
      <Form
        form={form}
        name="create-form"
        className='create-employee-form'
        labelCol={{ span: 24}}
        wrapperCol={{ span: 24 }}
        initialValues={ employee }
        onFinish={onFinish}
        autoComplete="on"
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
                  <Option key={language.id} value={[language.id, language.value]}>{language.value}</Option>
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
          hasFeedback={true}
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

export default EditEmployees;
