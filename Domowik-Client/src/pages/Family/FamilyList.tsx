import React from 'react';
import { List, Skeleton } from 'antd';
import { FamilyMember, Role } from './types';
import EditUser from './EditUser/EditUser';
import formatDate from '../../Helpers/formatDate';
import { FaCrown } from 'react-icons/fa';
import LeaveFamily from './LeaveFamily/LeaveFamily';

interface IFamilyList {
  members: FamilyMember[];
  user: {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    roleId: number;
  };
}

const FamilyList: React.FC<IFamilyList> = ({ members, user }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={members}
      loading={false}
      pagination={{
        pageSize: 4,
        showSizeChanger: false,
        hideOnSinglePage: true,
      }}
      renderItem={(item) => (
        <List.Item
          className="shadow-lg rounded !p-6 mb-4 bg-white"
          actions={[
            <div
              key="actions-container"
              className="flex items-center space-x-3"
            >
              {item.id === user.id && (
                <a key="editUser" className="text-blue-500 hover:underline">
                  <EditUser user={user} />
                </a>
              )}
              {(item.id === user.id || user.roleId === Role.Head) && (
                <a key="leave-family" className="text-red-500 hover:underline">
                  <LeaveFamily member={item} userId={user.id} />
                </a>
              )}
            </div>,
          ]}
        >
          <Skeleton loading={false}>
            <List.Item.Meta
              title={
                <div className="flex items-center">
                  <span className="pe-2">
                    {item.firstName} {item.lastName}{' '}
                  </span>
                  {item.roleId === Role.Head && (
                    <FaCrown color="brown" style={{ marginBottom: 3 }} />
                  )}
                </div>
              }
              description={`Data urodzenia: ${formatDate(new Date(item.dateOfBirth))}`}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default FamilyList;
