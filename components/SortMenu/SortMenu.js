import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import SortIcon from '../icons/SortIcon';

export const SORT = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  TITLE: 'title',
  SITE: 'site',
};

const SortMenu = ({ sorting, onSetSorting }) => {
  return (
    <Menu as="div" className="pl-3 relative inline-flex">
      <Menu.Button className="no-underline hover:text-black">
        <SortIcon />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-20 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {Object.values(SORT).map(
              (sortOption) => (
                <Menu.Item key={sortOption}>
                  {({ active }) => (
                    <button
                      className={`${
                        (active || sortOption === sorting) ? 'bg-primary text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => {
                        onSetSorting(sortOption);
                      }}
                    >
                      {sortOption}
                    </button>
                  )}
                </Menu.Item>
              )
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortMenu;
