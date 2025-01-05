import { useQuery } from 'react-query';
import { Col, Row, Pagination } from 'antd';
import { getFinances } from '../../Api';
import { getTransactionCategories } from '../../Api';
import AddNewTransaction from './AddNewTransaction';
import TransactionList from './TransactionList';
import { useState } from 'react';

const Finances = () => {
  const { data, isLoading } = useQuery('finances', getFinances);
  const {
    data: transactionCategoriesData,
    isLoading: transactionCategoriesIsLoading,
  } = useQuery('transaction-categories', () => getTransactionCategories());

  // Stan do paginacji
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;

  if (isLoading || transactionCategoriesIsLoading) return <p>Ładowanie...</p>;

  // Obliczanie indeksów do cięcia transakcji
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

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

            {/* Lista transakcji z paginacją */}
            <div className="transaction-list-wrapper mt-3">
              <TransactionList transactionList={data?.data.transactions.slice(startIndex, endIndex)} />
            </div>
          </div>
        </div>
      </Col>
      <Col span={1} offset={13}>
      {/* Paginacja */}
      <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data?.data.transactions.length}
              onChange={(page) => setCurrentPage(page)}
              style={{ marginTop: '20px', textAlign: 'right' }}
            />
      </Col>
    </Row>
    
  );
};

export default Finances;
