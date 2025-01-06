import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useQuery } from 'react-query';
import { getNotes } from '../../Api/Notes';
import Notes from './Notes';
import AddNewNote from './add/addNewNote';

const Index: React.FC = () => {
    const { data: notes, isLoading } = useQuery(
        'notes',
        getNotes,
    );

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
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-3xl font-bold">Twoje notatki</h2>
                        <AddNewNote />
                    </div>
                    {notes && notes?.length > 0 ? (
                        <Notes notes={notes} />
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Index;
