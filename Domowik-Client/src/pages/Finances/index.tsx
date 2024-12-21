import { useQuery } from 'react-query';
import { Col, Row } from 'antd';
import { getFinances } from '../../Api';
import { getTransactionCategories } from '../../Api';
import AddNewTransaction from './AddNewTransaction';
import TransactionList from './TransactionList';

const Finances = () => {
  const { data, isLoading } = useQuery('finances', getFinances);
  const {
    data: transactionCategoriesData,
    isLoading: transactionCategoriesIsLoading,
  } = useQuery('transaction-categories', () => getTransactionCategories());

  if (isLoading || transactionCategoriesIsLoading) return <p>Ładowanie...</p>;

  return (
    <Row>
      <Col span={8} offset={8}>
        <div className="px-4">
          <div className=" mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-bold">Finanse</h1>
              <AddNewTransaction
                transactionCategoriesData={transactionCategoriesData.data}
              />
            </div>
            <h2 className="mt-5 text-xl">
              Stan konta:{' '}
              <span
                className={`font-bold text-2xl ${
                  data?.data.budget > 0 ? 'text-green-700' : 'text-red-600'
                }`}
              >
                {data?.data.budget}
              </span>
            </h2>

            <div className="transaction-list-wrapper mt-3">
              <TransactionList transactionList={data?.data.transactions} />
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Finances;
