import { useState } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import { Modal } from 'antd';
import AddNewTransactionForm from './AddNewTransactionForm';
import { TransactionCategory } from '../../Api/types';

interface IAddNewTransaction {
  transactionCategoriesData: TransactionCategory[];
}

const AddNewTransaction: React.FC<IAddNewTransaction> = ({
  transactionCategoriesData,
}) => {
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

  return (
    <>
      <button
        onClick={showModal}
        className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <IoAddCircleSharp size={40} />
        <span className="ml-2">Dodaj nową transakcję</span>
      </button>

      <Modal
        title="Nowa transakcja"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        style={{ left: 80 }}
      >
        <div className="flex justify-center my-4">
          <button
            onClick={() => setIsIncome(true)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              isIncome ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            } hover:bg-blue-700 transition-colors duration-200`}
          >
            Dochód
          </button>
          <button
            onClick={() => setIsIncome(false)}
            className={`px-6 py-2 rounded-lg font-semibold ml-2 ${
              !isIncome ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
            } hover:bg-blue-700 transition-colors duration-200`}
          >
            Wydatek
          </button>
        </div>
        <AddNewTransactionForm
          handleCancel={handleCancel}
          isIncome={isIncome}
          transactionCategoriesData={transactionCategoriesData}
        />
      </Modal>
    </>
  );
};

export default AddNewTransaction;
