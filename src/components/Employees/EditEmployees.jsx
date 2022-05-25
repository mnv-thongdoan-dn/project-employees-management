import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const idUser = location.state;
  const [form] = Form.useForm()

  const { isLoading, employee } = useSelector(employeesSelector);
  const { positions } = useSelector(positionsSelector);
  const { languages } = useSelector(languagesSelector);
  const { frameWorks } = useSelector(frameWorksSelector);
  const [ selectedlanguage, setSelectedLanguage ] = useState('');

  useEffect(() => {
    dispatch(positionsThunk());
    dispatch(languagesThunk());
    dispatch(employeeGetItemThunk(idUser));
  }, [dispatch, idUser])

  useEffect(() => {
    form.setFieldsValue(employee);
    const convertLanguageId = (data = selectedlanguage) => {
      switch (data) {
        case "Php":
          return 1
        case "Ruby":
          return 2
        case "Javascript":
          return 3
        case "Java":
          return 4
        case "Python":
          return 5
        default:
          break;
      }
    }
    setSelectedLanguage(convertLanguageId(employee.language));
  }, [form, employee, selectedlanguage])

  useEffect(() => {
    if(selectedlanguage) {
      dispatch(frameWorksThunk(selectedlanguage));
    }
  }, [selectedlanguage, dispatch])

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
          idEmployee: idUser,
          dataEmployee: formatValues
        }
        updatetEmployee(datas);
      })
    } else{
      const datas = {
        idEmployee: idUser,
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
      disableBtn={true}
    />

  )
}

export default EditEmployees;
