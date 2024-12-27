import { Col, List, Row, Skeleton } from 'antd';

const FamilyListPlaceholder = () => {
  const members = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
  ];
  return (
    <Row className="mt-5">
      <Col span={8} offset={8}>
        <div className="flex justify-between items-center mb-10">
          <div className="bg-gray-300 animate-pulse w-60 h-6 rounded-full"></div>
        </div>
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <div className="family-list-wrapper mt-3">
            <List
              itemLayout="horizontal"
              dataSource={members}
              loading={false}
              renderItem={() => (
                <List.Item
                  className="shadow-lg rounded !p-6 mb-4 bg-white"
                  actions={[
                    <div
                      key="actions-container"
                      className="flex items-center space-x-3"
                    ></div>,
                  ]}
                >
                  <Skeleton loading={false}>
                    <List.Item.Meta
                      title={
                        <div className="flex items-center">
                          <span className="pe-2 bg-gray-300 animate-pulse rounded-full w-20 h-4"></span>
                        </div>
                      }
                      description={
                        <div className="bg-gray-300 mt-3 animate-pulse rounded-full w-60 h-3"></div>
                      }
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default FamilyListPlaceholder;
