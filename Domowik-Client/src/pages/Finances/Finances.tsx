import { Container, Row, Col } from 'reactstrap';
import { useQuery } from 'react-query';
import { getFinances } from '../../Api/api';
import AddNewTransaction from './AddNewTransaction';
import TransactionList from './TransactionList';

const Finances = () => {
  const { data, isLoading } = useQuery('finances', getFinances);

  if (isLoading) return <p>Ładowanie...</p>;
  return (
    <Container>
      <Row>
        <Col xs="12" md={{ size: 10, offset: 1 }}>
          <h1 className="text-center">Finanse</h1>
          <h2 className="mt-5">
            Stan konta:{' '}
            <span
              className="fw-bold"
              style={
                data?.data.budget > 0 ? { color: 'green' } : { color: 'red' }
              }
            >
              {data?.data.budget}
            </span>{' '}
          </h2>

          <div className="mt-5">
            <AddNewTransaction />
          </div>

          <div className="transaction-list-wrapper mt-3">
            <TransactionList transactionList={data?.data.transactions} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Finances;
