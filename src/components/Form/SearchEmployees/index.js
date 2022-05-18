import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Select, Button, Row, Col } from 'antd';
import { DownOutlined, UpOutlined, UserAddOutlined } from '@ant-design/icons';

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

const SearchEmployees = () => {

  const [ searchToggle, setSearchToggle ] = useState(false);
  // const [ languages, setLanguages ] = useState([]);
  // const [ frameworks, setFrameworks ] = useState([]);
  // const [ idLanguage, setIdLanguage ] = useState('');

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  // const getValueLanguages = (e) => {
  //   console.log("value language", e)
  //   setIdLanguage(e)
  // }

  const toggleSearchBtn = () => {
    setSearchToggle(!searchToggle);
  }

  // useEffect(() => {
  //   const getLanguages = async () => {
  //     const response = await fetch("https://server-employees-management.herokuapp.com/api/languages")
  //     .then(res => res);
  //     const data = await response.json()
  //     setLanguages(data)
  //   }

  //   getLanguages();
  // }, [])

  // useEffect(() => {
  //   const getFrameworks = async () => {
  //     if(!idLanguage) {
  //       return;
  //     }
  //     const response = await fetch(`https://server-employees-management.herokuapp.com/api/languages/${idLanguage}/frameworks`)
  //     .then(res => res);
  //     const data = await response.json();
  //     console.log("data frameworks", data[0].values)
  //     setFrameworks(data[0].values)
  //   }
  //   getFrameworks();
  // }, [idLanguage])

  // console.log("frameworks", frameworks)

  return (
    <Form
      name="search-form"
      className='search-form'
      // initialValues={{
      //   remember: true,
      // }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Row>
        <Col lg={20} className='search-wrapper'>
          <Row className='search-basic'>
            <Form.Item
              label="Full Name"
              name="name"
            >
              <Input 
                // prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="Search Full Name" 
              />
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
            >
              <Input
                // prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Search Age" 
              />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
            >
              <Input
                // prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Search gender" 
              />
            </Form.Item>
          </Row>
          { searchToggle 
            ?  <Row className='search-advanced'>
                <Form.Item
                  label="Position"
                  name="position"
                >
                  <Select>
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
                >
                  <Select>
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
                >
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="select one frameworks"
                    optionLabelProp="label"
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
              </Row> 
            : ''
          }
        </Col>
        <Col lg={4}>
          <Row>
            { searchToggle       
              ? <Button className='search-btn-toggle' type="primary" htmlType="button" onClick={() => toggleSearchBtn()}>
                  Search Basic 
                  <UpOutlined/> 
                </Button>
              : <Button className='search-btn-toggle' type="primary" htmlType="button" onClick={() => toggleSearchBtn()}>
                  Search Advanced 
                  <DownOutlined/>
                </Button>
            }
          </Row>
          <Row>
            <Link to="create">
              Create New Employee
              <UserAddOutlined />
            </Link>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchEmployees;
