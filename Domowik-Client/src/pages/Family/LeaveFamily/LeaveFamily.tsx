import { ImCross } from 'react-icons/im';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { removeFamilyMember } from '../../../Api/api';

interface ILeaveFamily {
  member: {
    id: number;
    firstName: string;
  };
  userId: number;
}

const LeaveFamily: React.FC<ILeaveFamily> = ({ member, userId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const removeFamilyMemberMutation = useMutation(removeFamilyMember);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    removeFamilyMemberMutation.mutate(member.id, {
      onError: (err) => {
        console.warn('err', err);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['family'] });
        queryClient.invalidateQueries({ queryKey: ['user'] });
      },
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ImCross
        color="#bf2015"
        size={20}
        onClick={showModal}
        className="cursor-pointer"
      />
      <Modal
        title={
          member.id !== userId ? 'Usuń członka rodziny' : 'Wyjdź z rodziny'
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        style={{ left: 80 }}
      >
        {member.id !== userId ? (
          <h3>
            Czy na pewno chcesz usunąć{' '}
            <span className="text-blue-600">{member.firstName}</span> z listy
            domowników? <br /> Ta operacja jest nieodwracalna.
          </h3>
        ) : (
          <h3>
            Czy na pewno chcesz opuścić rodzinę? Po tej operacji stracisz dostęp
            do funkcji zarządzania aplikacją domowik w ramach tej grupy.
          </h3>
        )}
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none"
          >
            Anuluj
          </button>
          <button
            onClick={handleOk}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Potwierdź
          </button>
        </div>
      </Modal>
    </>
  );
};

export default LeaveFamily;
