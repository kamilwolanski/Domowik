import { Progress } from 'antd';

const ShoppingListPlaceholder = () => {
  return (
    <div className="rounded overflow-hidden shadow-lg p-6 bg-white mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 bg-gray-200 rounded-full w-40 animate-pulse"></div>
        {/* <h2 className="text-xl font-semibold">Lorem ipsum</h2> */}
      </div>
      <Progress
        className="animate-pulse"
        percent={20}
        showInfo={false}
        strokeColor="#d4d5d7"
      />

      <div>
        <ul className="mt-5 shopping-list px-2">
          <li
            className={`py-1 px-3 flex justify-between items-center rounded-lg cursor-pointer`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`shoppingListEl-placeholder`}
                className="w-4 h-4 rounded bg-gray-100 animate-pulse border-gray-200"
              />
              <label className="text-gray-700 cursor-pointer">
                <span className="font-semibold text-base w-40 h-3 bg-gray-300 inline-block animate-pulse rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <img className="rounded-full w-6 h-6 bg-gray-400 animate-pulse" />
            </div>
          </li>
          <li
            className={`py-1 px-3 flex justify-between items-center rounded-lg cursor-pointer`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`shoppingListEl-placeholder`}
                className="w-4 h-4 rounded bg-gray-100 animate-pulse border-gray-200"
              />
              <label className="text-gray-700 cursor-pointer">
                <span className="font-semibold text-base w-20 h-3 bg-gray-300 inline-block animate-pulse rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <img className="rounded-full w-6 h-6 bg-gray-400 animate-pulse" />
            </div>
          </li>
          <li
            className={`py-1 px-3 flex justify-between items-center rounded-lg cursor-pointer`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`shoppingListEl-placeholder`}
                className="w-4 h-4 rounded bg-gray-100 animate-pulse border-gray-200"
              />
              <label className="text-gray-700 cursor-pointer">
                <span className="font-semibold text-base w-60 h-3 bg-gray-300 inline-block animate-pulse rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <img className="rounded-full w-6 h-6 bg-gray-400 animate-pulse" />
            </div>
          </li>
          <li
            className={`py-1 px-3 flex justify-between items-center rounded-lg cursor-pointer`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`shoppingListEl-placeholder`}
                className="w-4 h-4 rounded bg-gray-100 animate-pulse border-gray-200"
              />
              <label className="text-gray-700 cursor-pointer">
                <span className="font-semibold text-base w-80 h-3 bg-gray-300 inline-block animate-pulse rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <img className="rounded-full w-6 h-6 bg-gray-400 animate-pulse" />
            </div>
          </li>
          <li
            className={`py-1 px-3 flex justify-between items-center rounded-lg cursor-pointer`}
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={`shoppingListEl-placeholder`}
                className="w-4 h-4 rounded bg-gray-100 animate-pulse border-gray-200"
              />
              <label className="text-gray-700 cursor-pointer">
                <span className="font-semibold text-base w-40 h-3 bg-gray-300 inline-block animate-pulse rounded-full"></span>
              </label>
            </div>
            <div className="flex items-center">
              <img className="rounded-full w-6 h-6 bg-gray-400 animate-pulse" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShoppingListPlaceholder;
