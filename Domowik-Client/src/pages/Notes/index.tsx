import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import NotePlaceholder from './Placeholders/NotePlaceholder';

const Notes: React.FC = () => {
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

    return (
        <div>
            <Row>
                <Col span={colSpan} offset={colOffset}>
                    <NotePlaceholder />
                </Col>
            </Row>
        </div>
    );
};

export default Notes;
