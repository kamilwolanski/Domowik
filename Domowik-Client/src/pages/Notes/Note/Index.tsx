import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Note from './Note';

const Index = () => {
    const [colSpan, setColSpan] = useState(8)
    const { id } = useParams();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 720) {
                setColSpan(24)
            } else {
                setColSpan(8)
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Row className="justify-center">
            <Col span={colSpan} className="px-2">
                <Note paramId={Number(id)} />
            </Col>
        </Row>
    );
};

export default Index;
