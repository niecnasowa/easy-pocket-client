import { Transition } from '@headlessui/react'
import { Fragment } from 'react';

const Alert = ({ alert }) => {
  return (
    <Transition appear show={!!alert} as={Fragment}>
      <div className="fixed top-4 z-10 inset-x-4 bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700" role="alert">
        {alert}
      </div>
    </Transition>
  );
};

export default Alert;
