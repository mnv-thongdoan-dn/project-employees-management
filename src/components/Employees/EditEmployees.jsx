import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { employeeGetItemThunk, employeeUpdateThunk } from '../../store/slices/employeesSlice';
import getBase64 from '../../helpers/base64';

const EditEmployees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [form] = Form.useForm()

  const { isLoading, employee } = useSelector(employeesSelector);
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
    setSelectedLanguage(value);
    form.setFieldsValue({frameWorks: []});
  }

  const updatetEmployee = async (datas) => {
    const result = await dispatch(employeeUpdateThunk(datas));
    if(result.meta.requestStatus === "fulfilled") {
      Notification("success", "Message Employee", "Update Employee Success!");
      navigate("/dashboard/employees");
    }
  }

  const onFinish = (values) => {
    if(values.cv[0].originFileObj.name) {
      getBase64(values.cv[0].originFileObj, (url) => {
        const infoFilePdf = {...values.cv[0], base64: url};
        const formatValues = {...values, cv: [infoFilePdf]};
        const datas = {
          idEmployee: params.id,
          dataEmployee: formatValues
        }
        updatetEmployee(datas);
      })
    } else{
      const datas = {
        idEmployee: params.id,
        dataEmployee: values
      }
      updatetEmployee(datas);
    }
  }

  return (
    <EmployeesForm
      form={form}
      name="create-form"
      className='create-employee-form'
      labelCol={{ span: 24}}
      wrapperCol={{ span: 24 }}
      initialValues={ employee }
      onFinish={onFinish}
      languages={languages}
      positions={positions}
      frameWorks={frameWorks}
      isLoading={isLoading}
      handleOnChangeSelect={handleOnChangeSelect}
      textBtn='save'
      titleForm='Edit Employee'
    />

  )
}

export default EditEmployees;
