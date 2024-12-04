import { useQuery } from 'react-query';
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
    <div className="px-4 py-8">
      <div className=" mx-auto">
        <h1 className="text-center text-3xl font-semibold">Finanse</h1>
        <h2 className="mt-5 text-xl">
          Stan konta:{' '}
          <span
            className={`font-bold ${
              data?.data.budget > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {data?.data.budget}
          </span>
        </h2>

        <div className="mt-5">
          <AddNewTransaction
            transactionCategoriesData={transactionCategoriesData.data}
          />
        </div>

        <div className="transaction-list-wrapper mt-3">
          <TransactionList transactionList={data?.data.transactions} />
        </div>
      </div>
    </div>
  );
};

export default Finances;
