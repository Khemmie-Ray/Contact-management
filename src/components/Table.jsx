import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalForm from './ModalForm';

const Table = () => {
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleAddClick = () => {
    setShowModal(!showModal);
    setSelectedContact(null); 
  };

  const handleEditClick = (contact) => {
    setShowModal(!showModal);
    setSelectedContact(contact);
  };

  const handleDeleteClick = (email) => {
    const updatedContacts = contacts.filter((contact) => contact.email !== email);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };


  const handleFormSubmit = (newContact) => {
    if (selectedContact) {
      const updatedContacts = contacts.map((contact) =>
        contact.email === selectedContact.email ? newContact : contact
      );
      setContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    } else {
      
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }

    setShowModal(false);
    setSelectedContact(null);
  };

  return (
    <div className='w-[80%] mx-auto'>
      <button onClick={handleAddClick} className='bg-gray-400 text-black rounded-md p-4 mb-4 flex items-center justify-between w-[10%]'>
        Add <FaPlusCircle />
      </button>
      <table className='w-[100%]'>
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
              <td className='w-2/6 py-4 text-left text-[1rem]'>
                <button onClick={() => handleEditClick(contact)}><FaEdit /></button>
                <button onClick={() => handleDeleteClick(contact.email)}><MdDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ModalForm
          contact={selectedContact}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default Table;
