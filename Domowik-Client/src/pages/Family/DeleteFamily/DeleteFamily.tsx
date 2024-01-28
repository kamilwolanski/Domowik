import { Modal } from 'antd';
import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { Button } from 'reactstrap';
import { deleteFamily } from '../../../Api/api';

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
      <a className="delete-family-btn" type="button" onClick={showModal}>
        <MdDeleteForever size={50} color="#bf2015" />
      </a>
      <Modal
        title="Usuń rodzine"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        style={{ left: 80 }}
      >
        <h3>
          Czy na pewno chcesz usunąć rodzinę? Jeśli to zrobisz żaden z
          domowników nie będzie miał do niej dostępu oraz wszystkie dane zostaną
          utracone
        </h3>

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

export default DeleteFamily;
