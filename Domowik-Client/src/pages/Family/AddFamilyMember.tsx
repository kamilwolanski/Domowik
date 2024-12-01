import { useState } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import AddFamilyMemberForm from './AddFamilyMemberForm';

const AddFamilyMember = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Button to show the modal */}
      <button
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={showModal}
      >
        <IoAddCircleSharp size={40} />
        <span className="ml-2">Dodaj nowego domownika</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4">Nowy członek</h2>
            <AddFamilyMemberForm handleCancel={handleCancel} />
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Anuluj
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddFamilyMember;
