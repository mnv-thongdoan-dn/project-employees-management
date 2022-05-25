import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import EmployeesForm from '../Form/EmployeesForm';
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
import Notification from '../common/Notification';
import { ApiStatusCodes } from '../../constants/api.constants';

const CreateEmployees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm()

  const { isLoading } = useSelector(employeesSelector);
  const { positions } = useSelector(positionsSelector);
  const { languages } = useSelector(languagesSelector);
  const { frameWorks } = useSelector(frameWorksSelector);
  const [ selectedlanguage, setSelectedLanguage ] = useState(1);

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
      const formatValues = {...values, cv: url}
      const createEmployee = async () => {
        const res = await dispatch(employeeCreateThunk(formatValues));
        if(res.payload.status === ApiStatusCodes.CREATED) {
          Notification("success", "Message Employee", "Create Employee Success!");
          navigate("/dashboard/employees");
        }
      } 
      createEmployee();
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
