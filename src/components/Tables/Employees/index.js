import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Tag } from 'antd';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { EmployeesGetListThunk } from '../../../store/slices/employeesSlice';


const TableEmployees = () => {

  const dispatch = useDispatch();
  const [ dataEmployees, setDataEmployees ] = useState([]);
  const [windowSize, setWindowSize] = useState(() => {
    const { innerWidth: width} = window;
    return width;
  });

  const formatData = (datas) => {
    const dataSort = [...datas].sort((a, b) => b.updatedAt - a.updatedAt);
    const dataAddKey = dataSort.map((item, index) => ({...item, key: item.id, index: index + 1}));
    setDataEmployees(dataAddKey)
  }

  useEffect(() => {
    const employeesGetList = async () => {
      const result = await dispatch(EmployeesGetListThunk());
      formatData(unwrapResult(result))
    }
    employeesGetList()
  }, [])

  const columns = [
    {
      title: 'Index',
      width: 75,
      dataIndex: 'index',
      key: 'index',
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
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Age',
      width: 100,
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age
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
      dataIndex: 'frameWorks',
      key: 'frameWorks',
      width: 150,
      render: frameWorks => (
        <>
          {frameWorks.map(frameWork => {
            let color = frameWork.length > 5 ? 'geekblue' : 'green';
            if (frameWork === 'vue') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={frameWork}>
                {frameWork.toUpperCase()}
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

  // address: "Hai Phong"
  // age: 31
  // avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
  // createdAt: 1652844918454
  // cv: "https://www.topcv.vn/xem-cv/BAUJA1wKAgEAAFRSAlBQAAJWBAsCBFQOBwdSBQ50af"
  // email: "duongvanminh@gmail.com"
  // frameWork: ['Ruby On Rails']
  // gender: "male"
  // id: 12
  // index: 11
  // key: 12
  // language: "Ruby"
  // name: "Duong Van Minh"
  // phoneNumber: "05559998881"
  // position: "Junior"
  // updatedAt: 1652844918454


  return (
    <Table loading={dataEmployees.length > 0 ? false : true } columns={columns} dataSource={dataEmployees} scroll={{ x: 1500, y: 300 }}/>
  )
}

export default TableEmployees;
