import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import Note from './Note';

const Index = () => {
  const { id } = useParams();

  return (
    <Row className="justify-center">
      <Col xs={{ span: 24 }} md={{ span: 8 }} className="px-2">
        <Note paramId={Number(id)} />
      </Col>
    </Row>
  );
};

export default Index;
