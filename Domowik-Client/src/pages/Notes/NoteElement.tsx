import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiCircleMore } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useMutation, useQueryClient } from 'react-query';
import { Note } from '../../Api/Notes/types';
import { deleteNote } from '../../Api/Notes';
import EditNote from './edit/EditNote';
import { Popover } from 'antd';

interface INoteElement {
    noteEl: Note;
}

const NoteElement: React.FC<INoteElement> = ({
    noteEl,
}) => {
    const queryClient = useQueryClient();
    const deleteNoteMutation = useMutation(deleteNote);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);

    const hide = () => {
        setOpenPopover(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        setOpenPopover(newOpen);
    };

    const handleDelete = () => {
        deleteNoteMutation.mutate(noteEl.id, {
            onSuccess: () => {
                hide();
                queryClient.invalidateQueries({ queryKey: ['notes'] });
            },
        });
    };

    return (
        <Link
            to={`/notes/${noteEl.id}`}
            onClick={(event) => {
                if (openPopover || isEditModalOpen) {
                    event.preventDefault(); // Zatrzymaj nawigację, jeśli Popover jest otwarty
                }
            }}
        >
            <div
                key={noteEl.id}
                className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8 hover:bg-gray-200"
            >
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">{noteEl.title}</h2>
                    <div className="flex items-center justify-between">
                        <Popover
                            content={
                                <ul className="">
                                    <li className="hover:bg-gray-50 p-2">
                                        <EditNote
                                            noteEl={noteEl}
                                            isEditModalOpen={isEditModalOpen}
                                            setIsEditModalOpen={setIsEditModalOpen}
                                        />
                                    </li>
                                    <li className="hover:bg-gray-50 p-2">
                                        <button
                                            onClick={handleDelete}
                                            className="text-red-600 w-full text-left"
                                        >
                                            <MdDelete size={20} className="inline-block" />
                                            <span className="text-base ps-2">Usuń</span>
                                        </button>
                                    </li>
                                </ul>
                            }
                            trigger="click"
                            fresh
                            open={openPopover}
                            onOpenChange={handleOpenChange}
                            arrow={false}
                            placement="bottomRight"
                            overlayInnerStyle={{ marginTop: '10px', minWidth: '180px' }}
                        >
                            <button
                                className="pointer ms-3"
                                onClick={(event) => {
                                    event.preventDefault();
                                }}
                            >
                                <CiCircleMore size={24} color="#211f1f" />
                            </button>
                        </Popover>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default NoteElement;
