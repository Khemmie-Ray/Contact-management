import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from "react-icons/fa";
import ModalForm from './ModalForm';

const Table = () => {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleAddClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className='w-[80%] mx-auto'>
      <button onClick={handleAddClick} className='bg-gray-400 text-black rounded-md p-4 mb-4 flex items-center justify-between w-[10%]'>Add <FaPlusCircle /></button>
      <table className='w-[100%] '>
        <thead className='bg-gray-400 p-4'>
          <tr>
            <th className='w-2/6 py-4 text-left pl-2'>Name</th>
            <th className='w-2/6 py-4 text-left'>Email</th>
            <th className='w-1/6 py-4 text-left'>Phone Number</th>
            <th className='w-1/6 py-4 text-left'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.email} className='border-b'>
              <td className='w-2/6 py-4 text-left pl-2'>{contact.name}</td>
              <td className='w-2/6 py-4 text-left'>{contact.email}</td>
              <td className='w-2/6 py-4 text-left'>{contact.phone}</td>
              <td className='w-2/6 py-4 text-left'>Actions</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <ModalForm  />}
    </div>
  );
}

export default Table;
