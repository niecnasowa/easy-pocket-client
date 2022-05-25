import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react';

const AddModal = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const addInputRef = useRef(null);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    onSubmit(addInputRef.current.value);

    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClose}>
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
                        ref={addInputRef}
                        type="text"
                        name="search"
                        className="form-input px-4 py-3 rounded w-full"
                        placeholder="https://google.com"
                      />
                    </div>

                    <button className="shrink-0 ml-10 focus:outline-none text-white bg-primary font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                      Add
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  );
};

export default AddModal;
