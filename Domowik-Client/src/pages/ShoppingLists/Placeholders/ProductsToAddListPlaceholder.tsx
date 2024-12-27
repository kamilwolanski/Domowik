import { CiCirclePlus } from 'react-icons/ci';

const ProductsToAddListPlaceholder = () => {
  return (
    <ul className="max-h-64 overflow-y-auto border border-gray-300 rounded-md p-4 shadow-lg mt-4 bg-gray-50 scrollbar-thin">
      <li className="p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-100 bg-gray-50 flex justify-between">
        <div className="flex items-center">
          <button>
            <CiCirclePlus size={20} className="animate-pulse" color="gray" />
          </button>

          <span className="ms-2 w-20 h-2.5 bg-gray-300 rounded-full animate-pulse"></span>
        </div>
      </li>
      <li className="p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-100 bg-gray-50 flex justify-between">
        <div className="flex items-center">
          <button>
            <CiCirclePlus size={20} className="animate-pulse" color="gray" />
          </button>

          <span className="ms-2 w-40 h-2.5 bg-gray-300 rounded-full animate-pulse"></span>
        </div>
      </li>
      <li className="p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-100 bg-gray-50 flex justify-between">
        <div className="flex items-center">
          <button>
            <CiCirclePlus size={20} className="animate-pulse" color="gray" />
          </button>

          <span className="ms-2 w-10 h-2.5 bg-gray-300 rounded-full animate-pulse"></span>
        </div>
      </li>
      <li className="p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-100 bg-gray-50 flex justify-between">
        <div className="flex items-center">
          <button>
            <CiCirclePlus size={20} className="animate-pulse" color="gray" />
          </button>

          <span className="ms-2 w-20 h-2.5 bg-gray-300 rounded-full animate-pulse"></span>
        </div>
      </li>
      <li className="p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-100 bg-gray-50 flex justify-between">
        <div className="flex items-center">
          <button>
            <CiCirclePlus size={20} className="animate-pulse" color="gray" />
          </button>

          <span className="ms-2 w-40 h-2.5 bg-gray-300 rounded-full animate-pulse"></span>
        </div>
      </li>
      <li className="p-2 border-b last:border-b-0 border-gray-200 hover:bg-gray-100 bg-gray-50 flex justify-between">
        <div className="flex items-center">
          <button>
            <CiCirclePlus size={20} className="animate-pulse" color="gray" />
          </button>

          <span className="ms-2 w-20 h-2.5 bg-gray-300 rounded-full animate-pulse"></span>
        </div>
      </li>
    </ul>
  );
};

export default ProductsToAddListPlaceholder;
