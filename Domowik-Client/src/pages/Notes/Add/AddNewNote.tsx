import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { IoAddCircleSharp } from 'react-icons/io5';
import AddNewNotetForm from './AddNewNoteForm';

const AddNewNote = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalWidth, setModalWidth] = useState(500)
    const [isMobile, setIsMobile] = useState(false)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 720) {
                setModalWidth(364)
                setIsMobile(true)
            } else {
                setModalWidth(500)
                setIsMobile(false)
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <button
                onClick={showModal}
                className="flex items-center bg-blue-600 text-white py-2 px-2 md:px-4 rounded-full md:rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                <IoAddCircleSharp size={30} />
                {!isMobile &&
                    <span className="ml-2">Stwórz nową notatkę</span>
                }
            </button>

            <Modal
                title="Nowa notantka"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={modalWidth}
            >
                <AddNewNotetForm handleCancel={handleCancel} />
            </Modal>
        </>
    );
};

export default AddNewNote;
