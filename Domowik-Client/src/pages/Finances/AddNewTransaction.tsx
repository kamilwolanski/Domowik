import { useState } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Button } from 'reactstrap';
import { Modal } from 'antd';
import AddNewTransactionForm from './AddNewTransactionForm';

const AddNewTransaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(true);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log('isIncome', isIncome);

  return (
    <>
      <Button color="primary" onClick={showModal}>
        <IoAddCircleSharp size={40} />
        <span className="ms-2">Dodaj nową transakcję</span>
      </Button>

      <Modal
        title="Nowa transakcja"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        style={{ left: 80 }}
      >
        <div className="d-flex justify-content-center my-4">
          <Button
            className="me-2"
            onClick={() => setIsIncome(true)}
            color={isIncome ? 'primary' : 'secondary'}
          >
            Dochód
          </Button>
          <Button
            className="ms-2"
            onClick={() => setIsIncome(false)}
            color={!isIncome ? 'primary' : 'secondary'}
          >
            Wydatek
          </Button>
        </div>
        <AddNewTransactionForm
          handleCancel={handleCancel}
          isIncome={isIncome}
        />
      </Modal>
    </>
  );
};

export default AddNewTransaction;
