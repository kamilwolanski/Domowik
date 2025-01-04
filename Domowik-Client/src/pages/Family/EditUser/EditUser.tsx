import { CiEdit } from 'react-icons/ci';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
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
  const [modalWidth, setModalWidth] = useState(500)

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setModalWidth(364)
      } else {
        setModalWidth(500)
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        width={modalWidth}
      >
        <EditUserForm handleCancel={handleCancel} user={user} />
      </Modal>
    </>
  );
};

export default EditUser;
