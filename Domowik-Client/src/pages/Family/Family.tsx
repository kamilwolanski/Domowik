import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Modal } from 'antd';
import { GiHouse } from 'react-icons/gi';
import CreateFamilyForm from './CreateFamilyForm';

const Family: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Container>
        <Row>
          <Col xs="12" md={{ size: 6, offset: 3 }}>
            <div className="text-center mt-5">
              <GiHouse size={150} />
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
        </Row>
        <Row></Row>
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
