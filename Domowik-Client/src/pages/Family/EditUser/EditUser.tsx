import { CiEdit } from 'react-icons/ci';
import { Modal } from 'antd';
import React, { useState } from 'react';
import EditUserForm from './EditUserForm';

interface IEditUser {
  user: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
  };
}

const EditUser: React.FC<IEditUser> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CiEdit size={25} color="black" onClick={showModal} />
      <Modal
        title="Edytuj swoje dane"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        style={{ left: 80 }}
      >
        <EditUserForm handleCancel={handleCancel} user={user} />
      </Modal>
    </>
  );
};

export default EditUser;
