import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { positionsThunk } from '../../../store/slices/positionsSlice';
import { languagesThunk } from '../../../store/slices/languagesSlice';
import { frameWorksThunk } from '../../../store/slices/frameworksSlice';
import { 
  positionsSelector, 
  languagesSelector,
  frameWorksSelector
} from '../../../store/selectors';

const { Option } = Select;

const SearchEmployees = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm()
  const [ searchToggle, setSearchToggle ] = useState(false);
  const { positions } = useSelector(positionsSelector);
  const { languages } = useSelector(languagesSelector);
  const { frameWorks } = useSelector(frameWorksSelector);
  const [ selectedlanguage, setSelectedLanguage ] = useState('');

  useEffect(() => {
    dispatch(positionsThunk());
    dispatch(languagesThunk());
  }, [dispatch])

  useEffect(() => {
    if(selectedlanguage) {
      dispatch(frameWorksThunk(selectedlanguage));
    }
  }, [selectedlanguage, dispatch])

  const handleOnChangeSelect = (value) => {
    console.log("values", value)
    setSelectedLanguage(value);
    form.setFieldsValue({frameWorks: []});
  }

  const toggleSearchBtn = () => {
    setSearchToggle(!searchToggle);
  }

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const layoutLabel = {
    xs: { span: 24 },
    sm: { span: 4},
    md: { span: 10},
    lg: { span: 8},
  }

  const layoutWrapper = {
    sx: { span: 24},
    sm: { span: 20},
    md: { span: 14},
    lg: { span: 16}
  }

  return (
    <Row className='search-wrapper'>
      <Col xs={24} sm={24} lg={18} xl={20}>
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
          { searchToggle 
            ?  <Row className='search-advanced'>
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
        </Form>
      </Col>
      <Col xs={24} sm={24} lg={6} xl={4}>
        { searchToggle       
          ? <Button className='btn btn-primary  btn-search-toggle' onClick={() => toggleSearchBtn()}>
              <span className='text'>Search Basic </span>
              <UpOutlined/> 
            </Button>
          : <Button className='btn btn-primary  btn-search-toggle' onClick={() => toggleSearchBtn()}>
              <span className='text'>Search Advanced</span>
              <DownOutlined/>
            </Button>
        }
      </Col>
    </Row>
  )
}

export default SearchEmployees;
