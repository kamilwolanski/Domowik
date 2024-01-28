import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Modal } from 'antd';
import { GiHouse } from 'react-icons/gi';
import CreateFamilyForm from './CreateFamilyForm';
import { useQuery } from 'react-query';
import { getUserFamily } from '../../Api/api';
import FamilyList from './FamilyList';
import AddFamilyMember from './AddFamilyMember';

const Family: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoading, isError, data, status } = useQuery(
    'family',
    getUserFamily,
  );

  console.log('data', data);
  console.log('status', status);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <h5>Ładowanie...</h5>;
  if (isError) return <h5>Błąd</h5>;
  return (
    <>
      <Container>
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <GiHouse size={150} />
          </Col>
        </Row>

        <Row>
          {data?.data.id ? (
            <>
              <h1 className="text-center mt-5 primary-text">
                {data?.data.name}
              </h1>
              <Col xs="12" md={{ size: 10, offset: 1 }}>
                <div className="mt-5">
                  <AddFamilyMember />
                </div>

                <div className="family-list-wrapper mt-3">
                  <FamilyList members={data.data.members} />
                </div>
              </Col>
            </>
          ) : (
            <Col xs="12" md={{ size: 6, offset: 3 }}>
              <div className="text-center">
                <h2 className="mt-5">
                  Wygląda na to, że nie jesteś jeszcze członkiem żadnej rodziny.
                </h2>
                <h2 className="mt-3 fw-bold">
                  Chcesz stworzyć nową rodzinę teraz?
                </h2>
                <Button
                  size="lg"
                  color="primary"
                  onClick={showModal}
                  className="mt-5"
                >
                  Utwórz rodzinę
                </Button>
              </div>
            </Col>
          )}
        </Row>
      </Container>

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
    </>
  );
};

export default Family;
