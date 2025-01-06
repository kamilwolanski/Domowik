import { Col } from "antd";

const NotePlaceholder = () => {
    return (
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8">
            <div className="flex items-center justify-between">
                <Col className="w-full">
                    <div className="h-4 bg-gray-200 rounded-full w-40 animate-pulse mb-6"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-11/12 animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-11/12 animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-full animate-pulse"></div>
                </Col>
            </div>
        </div>
    );
};

export default NotePlaceholder;