import { Dialog, Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react';
import { pocket } from '../helpers';
import { useIsLoggedIn } from '../hooks';
import { ArchiveIcon, CloseIcon, Layout } from '../components';
import { LoadingWithLayout }  from './redirect_to_login';

const SORT = {
  NEWEST: 'newest',
  OLDEST: 'oldest',
  TITLE: 'title',
  SITE: 'site',
};

const Home = () => {
  const isUserLoggedIn = useIsLoggedIn();

  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [sorting, setSorting] = useState(SORT.NEWEST);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchInputRef = useRef(null);

  const [searchValue, setSearchValue] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    setSearchValue(searchInputRef.current.value);

    handleCloseModal();
  };

  const handelResetSearch = () => {
    setSearchValue('');

    handleCloseModal();
  };

  const handleArchiveClick = (id) =>  async (e) => {
    e.preventDefault();

    console.log('handleArchiveClick', id);

    const data = await pocket.modify({ actions: [{ action: 'archive', item_id: id }] });

    console.log('data', data);

    loadItems();
  };

  const loadItems = async () => {
    setIsLoading(true);
    const data = await pocket.getData({ sort: sorting, search: searchValue });
    setItems(Object.values(data.list).sort((a, b) => a.sort_id - b.sort_id));
    setIsLoading(false);
  };

  useEffect(() => {
    if(isUserLoggedIn) {
      loadItems();
    }
  }, [isUserLoggedIn, sorting, searchValue]);

  if(isLoading) {
    return (
      <LoadingWithLayout>
        <p className="pt-2">Loading items</p>
      </LoadingWithLayout>
    );
  }

  return (
    <>
      <Layout>
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">

            <span className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
              List
            </span>

            <div className="flex items-center" id="store-nav-content">

              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button>
                  <div className="pl-3 inline-block no-underline hover:text-black" href="#">
                    <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                    </svg>
                  </div>
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
                                  setSorting(sortOption);
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
    
              {/* Search */}
              <button
                className="pl-3 inline-block no-underline hover:text-black"
                onClick={handleOpenModal}
              >
                <svg className="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                </svg>
              </button>

            </div>
          </div>
        </nav>

        {!isUserLoggedIn && (
          <div className="w-full z-30 top-0 px-6 py-1 flex items-center flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="font-bold">
              If you would like to display your pocket list. Please login in the top right corner.
            </span>
          </div>
        )}

        {isUserLoggedIn && items.map(
            (item) => {

              const imageUrl = item?.image?.src || item?.top_image_url;

              let title = item.resolved_title || item.given_title || '';
              if(title.length > 30) {
                title = title.substring(0, 19) + '...';
              }

              const source = item?.domain_metadata?.name
                || (item?.resolved_url?.match(/:\/\/(?:www\.)?([\w\d]+\.\w+)/) || [])[1]
                || '';

              return (
                <div key={item?.item_id} className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                  <a href={item?.resolved_url} target="_blank" rel="noreferrer">  
                    <div
                      className="hover:grow hover:shadow-lg w-full h-40 bg-cover bg-center bg-slate-200"
                      style={imageUrl ? { backgroundImage: `url('${imageUrl}')` } : undefined}
                    />
                    <div className="pt-3 flex items-center justify-between">
                      <p className="">
                        {title}
                      </p>

                      <span onClick={handleArchiveClick(item?.item_id)}>
                        <ArchiveIcon />
                      </span>
                    </div>
                    <p className="pt-1 text-gray-900">
                      {source}
                    </p>
                  </a>
                </div>
              );
            } 
          )}
      </Layout>

      {/* Search modal */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <form onSubmit={handleSubmitForm} className="flex">
                    <div className="relative w-full">
                      <input
                        ref={searchInputRef}
                        type="text"
                        name="search"
                        className="form-input px-4 py-3 rounded w-full"
                        defaultValue={searchValue}
                      />

                      {searchValue && (
                        <span className="absolute right-1 top-3 cursor-pointer" onClick={handelResetSearch}>
                          <CloseIcon  />
                        </span>
                      )}
                    </div>

                    <button className="shrink-0 ml-10 focus:outline-none text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                      Search
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Home;
