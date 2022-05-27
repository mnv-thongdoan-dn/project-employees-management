import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { positionsThunk } from '../../../store/slices/positionsSlice';
import { languagesThunk } from '../../../store/slices/languagesSlice';
import { frameWorksThunk } from '../../../store/slices/frameworksSlice';
import { 
  positionsSelector, 
  languagesSelector,
  frameWorksSelector,
  employeesSelector
} from '../../../store/selectors';
import { employeeSearchThunk } from '../../../store/slices/employeesSlice';

const { Option } = Select;

const SearchEmployees = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { positions } = useSelector(positionsSelector);
  const { isLoadingSearch } = useSelector(employeesSelector);
  const { languages } = useSelector(languagesSelector);
  const { frameWorks } = useSelector(frameWorksSelector);
  const [ searchToggle, setSearchToggle ] = useState(false);
  const [ selectedlanguage, setSelectedLanguage ] = useState('');
  const [ paramsSearch, setParamsSearch ] = useSearchParams({});

  useEffect(() => {
    dispatch(positionsThunk());
    dispatch(languagesThunk());
    navigate('/dashboard/employees')
  }, [dispatch, navigate])

  useEffect(() => {
    if(selectedlanguage) {
      dispatch(frameWorksThunk(selectedlanguage));
    }
  }, [selectedlanguage, dispatch])

  const handleOnChangeSelect = (value) => {
    setSelectedLanguage(value);
    form.setFieldsValue({frameWorks: []});
  }

  const checkNullParams = (params) => {
    let valueParams = {};
     for(let key in params) {
       if(key === 'frameWorks' && !params[key].hasOwnProperty(0)) { 
         key = null;
       } else if(!params[key]) {
        key = null;
       } else {
        valueParams[key] = params[key];
       }
    }
    return valueParams;
  }

  const onFinish = (values) => {
    const paramsSearch = checkNullParams(values);
    setParamsSearch(paramsSearch);
    dispatch(employeeSearchThunk(paramsSearch));
  };

  const onReset = () => {
    form.resetFields();
  };

  const toggleSearchBtn = () => {
    setSearchToggle(!searchToggle);
  }

  const layoutLabel = {
    xs: { span: 24 },
    sm: { span: 8},
    md: { span: 10},
    lg: { span: 8},
  }

  const layoutWrapper = {
    sx: { span: 24},
    sm: { span: 16},
    md: { span: 14},
    lg: { span: 16}
  }

  return (
    <Row xs={24} className='search-wrapper'>
      <Col >
        <Form
          form={form}
          name="search-form"
          className='search-form'
          initialValues={{
            frameWorks: []
          }}
          labelCol={layoutLabel}
          wrapperCol={layoutWrapper}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Col xs={24} className='group-input-search'>
            <Row className='search-basic'>
              <Form.Item
                label="Full Name"
                name="name"
              >
                <Input 
                  prefix={<UserOutlined className="site-form-item-icon" />} 
                  placeholder="Full Name" 
                />
              </Form.Item>
              <Form.Item
                label="Position"
                name="position"
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
            </Row>
            { searchToggle ?
            <Row className='search-advanced'>
              <Form.Item
                label="Language"
                name="language"
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
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="select one frameworks"
                  optionLabelProp="label"
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
            </Row> 
              : ''
            }
          </Col>
          <Col xs={24}>
            <Form.Item className='wrapper-group-btn'>
              <div className='group-btn'>
                <Button loading={isLoadingSearch} className='btn btn-primary' htmlType="submit">
                  Search
                </Button>
                <Button onClick={onReset} className='btn btn-third'>
                  reset
                </Button>
                <Button className='btn-toggle' onClick={() => toggleSearchBtn()}>
                  {
                    searchToggle ? <UpOutlined/> : <DownOutlined/>
                  }
                  <span className='text'>Collapse</span>
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Form>
      </Col>
    </Row>
  )
}

export default SearchEmployees;
