import React from 'react';
import { Link } from 'react-router-dom';
import { UserAddOutlined } from '@ant-design/icons';
import TableEmployees from '../Tables/Employees';
import SearchEmployees from '../Form/SearchEmployees';

const Employeees = () => {
  return (
    <div className='page-employees'>
      <SearchEmployees/>
      <div className='btn btn-create'>
        <Link to="create">
          <span className='text'>Create Employee</span>
          <UserAddOutlined />
        </Link>
      </div>
      <TableEmployees/>
    </div>
  )
}

export default Employeees;
