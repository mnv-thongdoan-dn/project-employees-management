import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Select, Radio, Button, InputNumber, message, Upload } from 'antd';
import { 
  UserOutlined, 
  NumberOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  HomeOutlined ,
  UploadOutlined
} from '@ant-design/icons';

const { Option } = Select;

const EmployeesForm = (props) => {

  const navigate = useNavigate();
  const [ disableUpImage, setDisableUpImage ] = useState(false);
  const [ disableUpFile, setDisableUpFile ] = useState(false);
  const [ base64FilePdf, setBase64FilePdf ] = useState('');
  const { 
        form, 
        name, 
        className, 
        labelCol, 
        wrapperCol, 
        initialValues, 
        onFinish,
        positions,
        languages,
        frameWorks,
        handleOnChangeSelect,
        isLoading,
        textBtn,
        titleForm
      } = props;

  const handleChangeUploadImage = (info) => {
    const isJpgOrPng = info.file.type === 'image/jpeg' || info.file.type === 'image/png';
    const isLt2M = info.file.size / 1024 / 1024 < 2;

    if(isJpgOrPng && isLt2M) {
      info.file.status = 'done';
      info.fileList.length > 0 ? setDisableUpImage(true) : setDisableUpImage(false);

      if (info.file.status === 'uploading') {
        return info?.fileList;
      }

      return info?.fileList;

      } else if(!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      } else if(!isLt2M) {
        message.error('Image must smaller than 2MB!');
      }
  };

  const handleChangeUploadFile = (info) => {
    const isJpgOrPng = info.file.type === 'application/pdf';
    if(isJpgOrPng) {
      info.file.status = 'done';
      info.fileList.length > 0 ? setDisableUpFile(true) : setDisableUpFile(false);
      return info?.fileList;
    } else{
      message.error('You can only upload PDF file!');
      return;
    }
  }

  return (
    <div className='wrapper-form'>
      <h1 className='title-form'>{titleForm}</h1>
      <Form
        form={form}
        name={name}
        className={className}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Form.Item
          name="avatar"
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={handleChangeUploadImage}
          rules={[
            { required: true, message: 'Please input link avatar!' },
          ]}
        >
          <Upload 
            name="avatar" 
            listType="picture"
          >
            <Button 
            className='btn-upload' 
            disabled={disableUpImage} 
            icon={<UploadOutlined />}
            >
              Click to upload Avatar
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="name"
          hasFeedback={true}
          rules={[
            { required: true, message: 'Please input Full Name!' },
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
          label="CV"
          name="cv"
          valuePropName="fileList"
          rules={[
            { required: true, message: 'Please input your file CV!' },
          ]}
          getValueFromEvent={handleChangeUploadFile}
        >
          <Upload
          >
            <Button 
              className='btn-upload' 
              disabled={disableUpFile} 
              icon={<UploadOutlined />}
            >
              Click to upload CV
            </Button>
          </Upload>
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
          ]}
        >
          <Input 
            prefix={<HomeOutlined className="site-form-item-icon" />} 
            placeholder="Address" 
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 24 }}
        >
          <div className='group-btn'>
            <Button className='btn btn-secondary' onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button loading={isLoading} className='btn btn-primary' htmlType="submit">
              {textBtn}
            </Button>
          </div>
        </Form.Item>

      </Form>
    </div>
  )
}

export default EmployeesForm;
