import React, {  useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { employeesGetListThunk, employeeDeleteThunk } from '../../../store/slices/employeesSlice';
import { EditOutlined, DeleteOutlined, FundViewOutlined } from '@ant-design/icons';
import Confirm from '../../common/Modal/Confirm';
import Notification from '../../common/Notification';
import { employeesSelector } from '../../../store/selectors';

const TableEmployees = () => {
  const dispatch = useDispatch();
  const { isLoading, employees } = useSelector(employeesSelector);
  const [ onConfirm, setOnConfirm ] = useState(false);
  const [ employeeSelected, setEmployeeSelected ] = useState('');
  const [ contentConfirm, setContentConfirm ] = useState('');

  const [windowSize] = useState(() => {
    const { innerWidth: width} = window;
    return width;
  });

  const dataSort = [...employees].sort((a, b) => b.updatedAt - a.updatedAt);
  const formatData = dataSort.length > 0 ? dataSort.map((item, index) => {
        return  {...item, key: item.id, index: index + 1};
       }) : [];

  const handleDelete = (employee) => {
    setEmployeeSelected(employee.id);
    setContentConfirm(`Are you sure you want to delete the employee ${employee.name} ?`);
    setOnConfirm(!onConfirm);
  };

  const handleOk = () => {
    const deleteEmployee = async () => {
      const result = await dispatch(employeeDeleteThunk(employeeSelected));
      if(result.meta.requestStatus === "fulfilled") {
        Notification('success', "message employee", "Delete employee success !")
        dispatch(employeesGetListThunk());
      }
    }
    deleteEmployee();
    setOnConfirm(!onConfirm);
  }

  const handleCancel = () => {
    setOnConfirm(!onConfirm);
  }

  useEffect(() => {
    dispatch(employeesGetListThunk());
  }, [dispatch]);

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
      render: (avatar) => {
        return  <img src={avatar[0].thumbUrl} alt='avatar employee'/>
      }
    },
    {
      title: 'Full Name',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      render: (_) => <a href='username'>{_}</a>
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
      width: 100
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
      width: 150,
      render: (language) => {
        if(typeof(language) === "number") { 
          switch (language) {
            case 1:
              return "Php"
            case 2:
              return "Ruby"
            case 3:
              return "Javascript"
            case 4:
              return "Java"
            case 5:
              return "Python"
            default:
              break;
          }
        }
        return language;
      }
    },
    {
      title: 'FrameWorks',
      dataIndex: 'frameWorks',
      key: 'frameWorks',
      width: 200,
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
      width: 250
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
      render: (record) => {
        return <a rel="noreferrer" href={record[0].base64} target="_blank" className='btn btn-viewcv'><FundViewOutlined/></a>
      }
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: windowSize >= 992 ? 'right' : '',
      width: 200,
      render: (record) => (
        <div className='group-btn'>
          <Link to='edit' state={record.id} className='btn btn-edit'><EditOutlined/></Link>
          <Button onClick={() => handleDelete(record)} className='btn btn-delete'><DeleteOutlined/></Button>
        </div>
      )
    },
  ];

  return (
    <>
      <Confirm 
        handleOk={handleOk} 
        handleCancel={handleCancel} 
        contentConfirm={contentConfirm}
        title='Confirm Delete Employees'
        onConfirm={onConfirm}
      />
      <Table 
        loading={isLoading} 
        columns={columns} 
        dataSource={formatData} 
        scroll={{ x: 1500, y: 300 }}
      />
    </>
  )
}

export default TableEmployees;
