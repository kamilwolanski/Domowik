import { Modal } from 'antd';
import { MdEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { Note } from '../../../Api/Notes/types';
import EditNoteForm from './EditNoteForm';

interface IEditNote {
    noteEl: Note;
    isEditModalOpen: boolean;
    setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditNote: React.FC<IEditNote> = ({
    noteEl,
    isEditModalOpen,
    setIsEditModalOpen,
}) => {
    const showModal = () => {
        setIsEditModalOpen(true);
    };

    const handleOk = () => {
        setIsEditModalOpen(false);
    };

    const handleCancel = () => {
        setIsEditModalOpen(false);
    };

    const [modalWidth, setModalWidth] = useState(500)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 720) {
                setModalWidth(364)
            } else {
                setModalWidth(500)
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
            <button onClick={showModal} className="w-full text-left">
                <MdEdit size={20} className="inline-block" />
                <span className="text-base ps-2">Zmień nazwę</span>
            </button>
            <Modal
                title="Zmień tytuł notatki"
                open={isEditModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                width={modalWidth}
            >
                <EditNoteForm
                    handleCancel={handleCancel}
                    notetEl={noteEl}
                />
            </Modal>
        </>
    );
};

export default EditNote;
