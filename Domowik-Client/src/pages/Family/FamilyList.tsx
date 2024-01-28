import React from 'react';
import { List, Skeleton } from 'antd';
import { FamilyMember } from './types';
import { ImCross } from 'react-icons/im';

interface IFamilyList {
  members: FamilyMember[];
}

const FamilyList: React.FC<IFamilyList> = ({ members }) => {
  console.log('members', members);
  return (
    <List
      itemLayout="horizontal"
      dataSource={members}
      loading={false}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a key="delete-user">
              <ImCross color="red" />
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
