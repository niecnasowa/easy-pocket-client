import { useEffect, useState } from 'react';
import { pocket } from '../helpers';
import { useIsLoggedIn } from '../hooks';
import {
  AddIcon,
  AddModal,
  Alert,
  ArchiveIcon,
  Item,
  Layout,
  SearchModal,
  SearchIcon,
  SignInIcon,
  SortMenu,
} from '../components';
import { SORT } from '../components/SortMenu/SortMenu';
import { LoadingWithLayout }  from './redirect_to_login';

const Home = () => {
  const isUserLoggedIn = useIsLoggedIn();

  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [sorting, setSorting] = useState(SORT.NEWEST);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [searchValue, setSearchValue] = useState('');

  const [isShowingArchive, setIsShowingArchive] = useState(false);

  const [error, setError] = useState('');

  const handleSearchOpenModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleSearchCloseModal = () => {
    setIsSearchModalOpen(false);
  };

  const handleAddOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const handleToggleArchive = () => {
    setIsShowingArchive((oldVal => !oldVal));
  };

  const handleArchiveClick = (id) =>  async (e) => {
    e.preventDefault();

    await pocket.modify({ actions: [{ action: 'archive', item_id: id }] });

    loadItems();
  };

  const handleAddItem = async (newUrl) => {
    const data = await pocket.add({ url: newUrl });

    if(!data) {
      setError(`Can't add item with this url.`)

      setTimeout(()=> setError(''), 2000);
      return;
    }

    loadItems();
  };

  const loadItems = async () => {
    setIsLoading(true);
    const data = await pocket.getData({
      sort: sorting,
      search: searchValue,
      ...(isShowingArchive && { state: 'archive' }),
    });
    setItems(Object.values(data.list).sort((a, b) => a.sort_id - b.sort_id));
    setIsLoading(false);
  };

  useEffect(() => {
    if(isUserLoggedIn) {
      loadItems();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn, sorting, searchValue, isShowingArchive]);

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

            <span className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
              List
              {searchValue && (
                <span className="font-normal text-lg normal-case">
                  {' '} [filtering: {searchValue}]
                </span>
              )}
              {isShowingArchive && (
                <span className="font-normal text-lg normal-case">
                  {' '} [archive]
                </span>
              )} 
            </span>

            {isUserLoggedIn && (
              <div className="flex items-center" id="store-nav-content">
                <button
                  className="pl-3 inline-block no-underline hover:text-black"
                  onClick={handleAddOpenModal}
                >
                  <AddIcon />
                </button>

                <SortMenu sorting={sorting} onSetSorting={setSorting} />

                <button
                  className={`pl-3 inline-block no-underline hover:text-black ${!!searchValue && 'text-purple-700'}`}
                  onClick={handleSearchOpenModal}
                >
                  <SearchIcon />
                </button>

                <button
                  className={`pl-3 inline-block no-underline hover:text-black ${isShowingArchive && 'text-purple-700'}`}
                  onClick={handleToggleArchive}
                >
                  <ArchiveIcon />
                </button>
              </div>
            )}
          </div>
        </nav>

        {!isUserLoggedIn && (
          <div className="w-full z-30 top-0 px-6 py-1 flex items-center flex-col">
            <SignInIcon />
            <span className="font-bold">
              If you would like to display your pocket list. Please login in the top right corner.
            </span>
          </div>
        )}

        {isUserLoggedIn && items.map(
          (item) => (
            <Item
              key={item?.item_id}
              item={item}
              onArchiveClick={handleArchiveClick(item?.item_id)}
            />
          ),
        )}
      </Layout>

      <SearchModal
        isOpen={isSearchModalOpen}
        searchValue={searchValue}
        onClose={handleSearchCloseModal}
        onSetSearchValue={setSearchValue}
      />

      <AddModal
        isOpen={isAddModalOpen}
        onClose={handleAddCloseModal}
        onSubmit={handleAddItem}
      />

      <Alert alert={error} />
    </>
  );
};

export default Home;
