import { useState } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Button } from 'reactstrap';
import { Modal } from 'antd';
import AddFamilyMemberForm from './AddFamilyMemberForm';

const AddFamilyMember = () => {
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
      <Button color="primary" onClick={showModal}>
        <IoAddCircleSharp size={40} />
        <span className="ms-2">Dodaj nowego domownika</span>
      </Button>

      <Modal
        title="Nowy członek"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        style={{ left: 80 }}
      >
        <AddFamilyMemberForm handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default AddFamilyMember;
