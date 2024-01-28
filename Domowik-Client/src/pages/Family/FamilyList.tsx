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
  console.log('user', user);
  return (
    <List
      itemLayout="horizontal"
      dataSource={members}
      loading={false}
      renderItem={(item) => (
        <List.Item
          actions={[
            item.id === user.id && (
              <a key="editUser">
                <EditUser user={user} />
              </a>
            ),
            (item.id === user.id || user.roleId === Role.Head) && (
              <a key="leave-family">
                <LeaveFamily member={item} userId={user.id} />
              </a>
            ),
          ].filter(Boolean)}
        >
          <Skeleton loading={false}>
            <List.Item.Meta
              title={
                <div>
                  {item.firstName} {item.lastName}{' '}
                  {item.roleId === Role.Head && (
                    <FaCrown color="brown" style={{ marginBottom: 7 }} />
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
