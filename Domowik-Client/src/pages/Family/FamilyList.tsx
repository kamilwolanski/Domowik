import React from 'react';
import { List, Skeleton } from 'antd';
import { FamilyMember } from './types';
import { ImCross } from 'react-icons/im';
import EditUser from './EditUser/EditUser';

interface IFamilyList {
  members: FamilyMember[];
  user: {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
}

const FamilyList: React.FC<IFamilyList> = ({ members, user }) => {
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
            <a key="delete-user">
              <ImCross color="red" size={20} />
            </a>,
          ]}
        >
          <Skeleton loading={false}>
            <List.Item.Meta
              title={item.firstName}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default FamilyList;
