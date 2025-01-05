import { useQuery } from 'react-query';
import { Col, Row } from 'antd';
import { getFinances } from '../../Api';
import { getTransactionCategories } from '../../Api';
import AddNewTransaction from './AddNewTransaction';
import TransactionList from './TransactionList';
import TransactionsChart from './TransactionsChart'
import { useEffect, useState } from 'react';

const Finances = () => {
  const { data, isLoading } = useQuery('finances', getFinances);
  const {
    data: transactionCategoriesData,
    isLoading: transactionCategoriesIsLoading,
  } = useQuery('transaction-categories', () => getTransactionCategories());

  const [colSpan, setColSpan] = useState(8)
  const [colOffset, setColOffest] = useState(8)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setColSpan(24)
        setColOffest(0)
      } else {
        setColSpan(8)
        setColOffest(8)
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading || transactionCategoriesIsLoading) return <p>Ładowanie...</p>;

  return (
    <Row>
      <Col span={colSpan} offset={colOffset}>
        <div className="px-4">
          <div className=" mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h1 className="text-3xl font-bold pr-12">Finanse</h1>
              <AddNewTransaction
                transactionCategoriesData={transactionCategoriesData.data}
              />
            </div>
            <h2 className="mt-5 text-xl">
              Stan konta:{' '}
              <span
                className={`font-bold text-2xl ${data?.data.budget > 0 ? 'text-green-700' : 'text-red-600'
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

        {data?.data.transactions &&
          <div className="pt-16">
            <TransactionsChart transactionList={data?.data.transactions} />
          </div>
        }

      </Col>
    </Row>
  );
};

export default Finances;
