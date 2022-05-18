import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Tag } from 'antd';


const TableEmployees = () => {

  const [windowSize, setWindowSize] = useState(() => {
    const { innerWidth: width} = window;
    return width;
  });

  const columns = [
    {
      title: 'Index',
      width: 75,
      dataIndex: 'key',
      key: 'key',
      fixed: windowSize >= 992 ? 'left' : '',
    },
      {
      title: 'Avatar',
      width: 150,
      dataIndex: 'avatar',
      key: 'avatar',
      fixed: windowSize >= 992 ? 'left' : '',
      render: text => <img src={text} alt='image'/>,
    },
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'fullName',
      key: 'fullName'
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 150
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      width: 150,
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      width: 150
    },
    {
      title: 'FrameWorks',
      dataIndex: 'frameworks',
      key: 'frameworks',
      width: 150,
      render: frameworks => (
        <>
          {frameworks.map(framework => {
            let color = framework.length > 5 ? 'geekblue' : 'green';
            if (framework === 'vue') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={framework}>
                {framework.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 150
    },
    {
      title: 'PhoneNumber',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 150
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 150
    },
    { 
      title: 'CV',
      dataIndex: 'cv',
      key: 'cv',
      width: 150,
      render: (record) => (
        <a href={record} target="_blank" className='btn btn-secondary'>View CV</a>
      )
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: windowSize >= 992 ? 'right' : '',
      width: 200,
      render: (record) => (
        <div className='group-btn'>
          <Link to='edit' className='btn btn-edit'>Edit</Link>
          <Button className='btn btn-delete'>Delete</Button>
        </div>
      )
    },
  ];

const data = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 3233333333333333333333333333,
    address: `London Park1111111111111111111 no. ${i}`,
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    gender: 'male',
    position: 'intern',
    language: 'php',
    frameworks: ['laravel', 'react', 'vue'],
    cv: "https://www.topcv.vn/xem-cv/BAUJA1wKAgEAAFRSAlBQAAJWBAsCBFQOBwdSBQ50af",
  });
}  

  return (
    <Table loading={false} columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }}/>
  )
}

export default TableEmployees;
