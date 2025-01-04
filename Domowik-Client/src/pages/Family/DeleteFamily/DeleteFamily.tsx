import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { deleteFamily } from '../../../Api';

const DeleteFamily: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const deleteFamilyMutation = useMutation(deleteFamily, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['family'] });
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    deleteFamilyMutation.mutate();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Delete Family Button */}
      <button
        type="button"
        className="delete-family-btn p-2 text-red-600 hover:text-red-800 absolute bottom-12 right-0"
        onClick={showModal}
      >
        <MdDeleteForever size={50} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">
              Czy na pewno chcesz usunąć rodzinę? Jeśli to zrobisz żaden z
              domowników nie będzie miał do niej dostępu oraz wszystkie dane
              zostaną utracone.
            </h3>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Anuluj
              </button>
              <button
                type="button"
                onClick={handleOk}
                className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Potwierdź
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteFamily;
