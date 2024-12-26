import { useMutation, useQuery } from 'react-query';
import { getInvitation, useInvitation } from '../../Api/Invitation';
import { Col, Row } from 'antd';
import getQueryParam from '../../Helpers/getQueryParam';
import { useNavigate } from 'react-router-dom';

const InvitationConfirm = () => {
  const useInvitationMutation = useMutation(useInvitation);
  const navigate = useNavigate();
  const token = getQueryParam('token');
  const { data, isLoading } = useQuery('invitation', () =>
    getInvitation(String(token)),
  );
  const handleJoinFamily = () => {
    if (data?.token) {
      useInvitationMutation.mutate(data?.token, {
        onSuccess: () => {
          navigate('/family');
        },
        onError: (err) => {
          console.log('err', err);
        },
      });
    }
  };

  if (isLoading) return <p>loading...</p>;

  return (
    <Row className="justify-center text-center mt-20">
      <Col span={6}>
        <div>
          <h1 className="text-3xl font-semibold">
            {data?.sender.firstName} {data?.sender.lastName}
          </h1>
          <h2 className="text-2xl mt-3">
            Zaprosił Cie do dołączenia do rodziny{' '}
            <strong>{data?.familyName}</strong>
          </h2>
          <div className="shadow-lg rounded mt-10 bg-white p-10">
            <p className="text-xl">
              Zaakceptuje zaproszenie aby stać się częścią rodziny{' '}
              <strong>{data?.familyName}</strong>
            </p>

            <div className="flex mt-10 justify-center space-x-4">
              <button
                onClick={handleJoinFamily}
                className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 hover:text-white"
              >
                Dołącz do rodziny
              </button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default InvitationConfirm;
