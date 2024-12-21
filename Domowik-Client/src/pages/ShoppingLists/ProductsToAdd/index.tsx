import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import ProductsToAddList from './ProductsToAddList';
import { useParams } from 'react-router-dom';

interface IProductsToAdd {
  closeProductsToAddWindow: () => void;
}

const ProductsToAdd: React.FC<IProductsToAdd> = ({
  closeProductsToAddWindow,
}) => {
  const { id } = useParams();
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Dodaj produkty</h2>
        <button onClick={closeProductsToAddWindow}>
          <IoIosClose size={35} />
        </button>
      </div>
      <div className="relative mt-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block w-full p-2.5 ps-10"
          placeholder="Wyszukaj produkty np. mleko"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <ProductsToAddList paramId={Number(id)} searchValue={searchValue} />
      </div>
    </div>
  );
};

export default ProductsToAdd;
