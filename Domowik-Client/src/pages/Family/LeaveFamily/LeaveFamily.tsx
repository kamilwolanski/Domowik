import { ImCross } from 'react-icons/im';
import { Modal } from 'antd';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
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
      },
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ImCross color="#bf2015" size={20} onClick={showModal} />
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
            <span style={{ color: 'blue' }}>{member.firstName}</span> z listy
            domowników? <br /> Ta operacja jest nieodwracalna.
          </h3>
        ) : (
          <h3>
            Czy na pewno chcesz opuścić rodzinę? Po tej operacji stracisz dostęp
            do funkcji zarządzania aplikacją domowik w ramach tej grupy.
          </h3>
        )}
        <div className="text-end mt-3">
          <Button onClick={handleCancel}>Anuluj</Button>
          <Button
            color="primary"
            className="ms-2"
            type="submit"
            onClick={handleOk}
          >
            Potwierdź
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LeaveFamily;
