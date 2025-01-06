import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Modal } from 'antd';
import { useQuery } from 'react-query';
import { getUser, getUserFamily } from '../../Api';
import FamilyListPlaceholder from './Placeholders/FamilyListPlaceholder';
import { Role } from './types';
import AddFamilyMember from './AddFamilyMember';
import FamilyList from './FamilyList';
import DeleteFamily from './DeleteFamily/DeleteFamily';
import CreateFamilyForm from './CreateFamilyForm';

const Family: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState(500)
  const [colSpan, setColSpan] = useState(8)
  const [colOffset, setColOffest] = useState(8)

  const { isLoading, isError, data } = useQuery({
    queryKey: 'family',
    queryFn: getUserFamily,
    useErrorBoundary: true,
  });

  const { isLoading: userDataLoading, data: userData } = useQuery({
    queryKey: 'user',
    queryFn: getUser,
    useErrorBoundary: true,
  });

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
        setColSpan(24)
        setColOffest(0)
        setModalWidth(364)
      } else {
        setColSpan(8)
        setColOffest(8)
        setModalWidth(500)
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading || userDataLoading) return <FamilyListPlaceholder />;
  if (isError) return <h5>Błąd</h5>;

  const isHeadOfFamily = userData?.data.roleId === Role.Head;

  return (
    <div>
      <Row>
        <Col span={colSpan} offset={colOffset}>
          {data?.data.id ? (
            <>
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold pr-12">{data?.data.name}</h1>
                {isHeadOfFamily && (
                  <div className="mt-5">
                    <AddFamilyMember />
                  </div>
                )}
              </div>
              <div className="col-span-12 md:col-span-10 md:col-start-2">
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
                className="mt-5 bg-blue-600 text-white text-lg font-bold py-2 px-10 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={showModal}
              >
                Utwórz rodzinę
              </button>
            </div>
          )}
        </Col>
      </Row>

      {isHeadOfFamily && <DeleteFamily />}

      <Modal
        title="Nowa rodzina"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}
        width={modalWidth}
      >
        <CreateFamilyForm handleCancel={handleCancel} />
      </Modal>
    </div>
  );
};

export default Family;
