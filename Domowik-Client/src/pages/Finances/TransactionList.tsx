import { List, Skeleton } from 'antd';
import { ImCross } from 'react-icons/im';
import { Finance } from './types';
import formatDate from '../../Helpers/formatDate';
import { TbCash } from 'react-icons/tb';
import { useMutation, useQueryClient } from 'react-query';
import { removeTransaction } from '../../Api';

interface ITransactionList {
  transactionList: Finance[];
}

const TransactionList: React.FC<ITransactionList> = ({ transactionList }) => {
  const removeTransactionMutation = useMutation(removeTransaction);
  const queryClient = useQueryClient();

  const handleDelete = (transactionId: number) => {
    removeTransactionMutation.mutate(transactionId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['finances'] });
      },
    });
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={transactionList}
      loading={false}
      locale={{
        emptyText: (
          <div className="mt-5">
            <TbCash size={100} />
            <h3>Brak transakcji</h3>
          </div>
        ),
      }}
      renderItem={(item) => (
        <List.Item
          className="shadow-lg rounded !p-6 bg-white mb-4"
          actions={[
            <a key="leave-family">
              <ImCross
                color="#bf2015"
                size={15}
                onClick={() => handleDelete(item.id)}
              />
            </a>,
          ]}
        >
          <Skeleton loading={false}>
            <List.Item.Meta
              title={
                <div>
                  <div className="flex items-center">
                    <p className="mb-0 font-semibold">{item.name}:</p>

                    <p
                      className="font-bold mb-0 count ms-2"
                      style={
                        item.count >= 0 ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {item.count}
                    </p>
                  </div>
                  <span className="transaction-author">
                    Dokonujący transakcji:{' '}
                    <span className="font-semibold">
                      {item.user.firstName} {item.user.lastName}
                    </span>
                  </span>
                </div>
              }
              description={`Data transakcji: ${formatDate(new Date(item.createdDate))}`}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default TransactionList;
