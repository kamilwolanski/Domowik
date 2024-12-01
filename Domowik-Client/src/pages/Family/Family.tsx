import React, { useState } from 'react';
import { Modal } from 'antd';
import { GiHouse } from 'react-icons/gi';
import CreateFamilyForm from './CreateFamilyForm';
import { useQuery } from 'react-query';
import { getUser, getUserFamily } from '../../Api/api';
import FamilyList from './FamilyList';
import AddFamilyMember from './AddFamilyMember';
import { Role } from './types';
import DeleteFamily from './DeleteFamily/DeleteFamily';

const Family: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, isError, data } = useQuery('family', getUserFamily);

  const { isLoading: userDataLoading, data: userData } = useQuery(
    'user',
    getUser,
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading || userDataLoading) return <h5>Ładowanie...</h5>;
  if (isError) return <h5>Błąd</h5>;

  const isHeadOfFamily = userData?.data.roleId === Role.Head;

  return (
    <div className="family-wrapper h-full">
      <div className="grid grid-cols-1">
        <div className="mx-auto">
          <GiHouse size={150} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          {data?.data.id ? (
            <>
              <h1 className="text-2xl text-center mt-5">{data?.data.name}</h1>
              <div className="col-span-12 md:col-span-10 md:col-start-2">
                {isHeadOfFamily && (
                  <div className="mt-5">
                    <AddFamilyMember />
                  </div>
                )}

                <div className="family-list-wrapper mt-3">
                  <FamilyList
                    members={data.data.members}
                    user={userData?.data}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-12 md:col-span-6 md:col-start-4 text-center">
              <h2 className="mt-5">
                Wygląda na to, że nie jesteś jeszcze członkiem żadnej rodziny.
              </h2>
              <h2 className="mt-3 font-bold">
                Chcesz stworzyć nową rodzinę teraz?
              </h2>
              <button
                className="mt-5 px-6 py-3 bg-primary text-white text-lg rounded-lg"
                onClick={showModal}
              >
                Utwórz rodzinę
              </button>
            </div>
          )}
        </div>
      </div>
      {isHeadOfFamily && <DeleteFamily />}

      <Modal
        title="Nowa rodzina"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        style={{ left: 80 }}
      >
        <CreateFamilyForm handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default Family;
