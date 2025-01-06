import { useEffect, useRef, useState } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';
import { getOrCreateInvitation } from '../../Api/Invitation';
import { Modal } from 'antd';
import { useMutation } from 'react-query';

const AddFamilyMember = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitationLink, setInvitationLink] = useState('');
  const [modalWidth, setModalWidth] = useState(500);
  const [isMobile, setIsMobile] = useState(false);
  const getOrCreateInvitationMutation = useMutation(getOrCreateInvitation);

  const showModal = () => {
    setIsModalOpen(true);
    getOrCreateInvitationMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data.token) {
          setInvitationLink(
            `http://localhost:5173/invitation?token=${data.token}`,
          );
        }

        throw Error();
      },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setModalWidth(364);
        setIsMobile(true);
      } else {
        setModalWidth(500);
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const copyBtnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationLink);
    if (inputRef.current && copyBtnRef.current) {
      inputRef.current.classList.add('border-green-500');
      copyBtnRef.current.classList.add('bg-green-500');
      copyBtnRef.current.classList.add('hover:bg-green-500');
      copyBtnRef.current.textContent = 'Skopiowano';

      setTimeout(() => {
        if (inputRef.current && copyBtnRef.current) {
          inputRef.current.classList.remove('border-green-500');
          copyBtnRef.current.textContent = 'Kopiuj';
          copyBtnRef.current.classList.remove('bg-green-500');
          copyBtnRef.current.classList.remove('hover:bg-green-500');
        }
      }, 2000);
    }
  };

  return (
    <>
      {/* Button to show the modal */}
      <button
        className="flex items-center bg-blue-600 text-white px-2 md:px-4 py-2 rounded-full md:rounded-md hover:bg-blue-700"
        onClick={showModal}
      >
        <IoAddCircleSharp size={30} />
        {!isMobile && <span className="ml-2">Dodaj nowego domownika</span>}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <Modal
          title="Dodaj nowego członka rodziny"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          width={modalWidth}
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Wyślij link członkowi swojej rodziny
            </label>
            <div className="flex space-x-3">
              <input
                ref={inputRef}
                value={invitationLink}
                readOnly
                className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5"
              />
              <button
                ref={copyBtnRef}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={handleCopy}
              >
                kopiuj
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddFamilyMember;
