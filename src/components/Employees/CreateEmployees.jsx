import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';
import EmployeesForm from '../Form/EmployeesForm';
import Notification from '../common/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { 
  employeesSelector, 
  positionsSelector, 
  languagesSelector,
  frameWorksSelector
} from '../../store/selectors';
import { positionsThunk } from '../../store/slices/positionsSlice';
import { languagesThunk } from '../../store/slices/languagesSlice';
import { frameWorksThunk } from '../../store/slices/frameworksSlice';
import { employeeCreateThunk } from '../../store/slices/employeesSlice';
import getBase64 from '../../helpers/base64';

const CreateEmployees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm()

  const { isLoading, status } = useSelector(employeesSelector);
  const { positions } = useSelector(positionsSelector);
  const { languages } = useSelector(languagesSelector);
  const { frameWorks } = useSelector(frameWorksSelector);
  const [ selectedlanguage, setSelectedLanguage ] = useState(1);
  const [ base64File, setBase64File ] = useState('');

  const initialValues= {
    avatar: [],
    name: '',
    age: '',
    gender: 'male',
    positions: '',
    language: 'Php',
    frameWorks: [],
    email: '',
    phoneNumber: '',
    address: '',
    cv: []
  };

  useEffect(() => {
    dispatch(positionsThunk());
    dispatch(languagesThunk());
  }, [])

  useEffect(() => {
    dispatch(frameWorksThunk(selectedlanguage));
  }, [selectedlanguage])

  const handleOnChangeSelect = (value) => {
    setSelectedLanguage(value);
    form.setFieldsValue({frameWorks: []});
  }

  const onFinish = (values) => {
    getBase64(values.cv[0].originFileObj, (url) => {
      console.log("values", values)
      const formatValues = {...values, cv: url}
      console.log("formatValues", formatValues)
      dispatch(employeeCreateThunk(formatValues));
    })
  }

  return (
    <EmployeesForm
      form={form}
      name="create-form"
      className='create-employee-form'
      labelCol={{ span: 24}}
      wrapperCol={{ span: 24 }}
      initialValues={initialValues}
      onFinish={onFinish}
      handleOnChangeSelect={handleOnChangeSelect}
      isLoading={isLoading}
      positions={positions}
      languages={languages}
      frameWorks={frameWorks}
      textBtn='Create'
      titleForm='Create Employees'
    />
  )
}

export default CreateEmployees;
