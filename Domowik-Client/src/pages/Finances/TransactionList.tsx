import { List, Skeleton } from 'antd';
import { ImCross } from 'react-icons/im';
import { Finance } from './types';
import formatDate from '../../Helpers/formatDate';
import { TbCash } from 'react-icons/tb';
import { useMutation, useQueryClient } from 'react-query';
import { removeTransaction } from '../../Api/api';

interface ITransactionList {
  transactionList: Finance[];
}

const TransactionList: React.FC<ITransactionList> = ({ transactionList }) => {
  console.log('transactionList', transactionList);
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
          actions={[
            <a key="leave-family">
              <ImCross
                color="#bf2015"
                size={20}
                onClick={() => handleDelete(item.id)}
              />
            </a>,
          ]}
        >
          <Skeleton loading={false}>
            <List.Item.Meta
              title={
                <div>
                  <p className="mb-0 fw-bold">{item.name} </p>
                  <div className="d-flex align-items-center">
                    <p
                      className="fw-bold mb-0 count"
                      style={
                        item.count >= 0 ? { color: 'green' } : { color: 'red' }
                      }
                    >
                      {item.count}
                    </p>
                    <span className="ms-3 transaction-author">
                      Dokonujący transakcji:{' '}
                      <span className="fw-bold">
                        {item.user.firstName} {item.user.lastName}
                      </span>
                    </span>
                  </div>
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
