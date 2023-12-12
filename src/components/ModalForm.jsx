import React, { useState } from 'react'

const ModalForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const emailVal = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneVal = /^\d{10}$/;

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!name || !email || !phone) {
            alert('Please fill in all fields');
            return;
          }
      
        if (!emailVal.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
      
        if (!phoneVal.test(phone)) {
            alert('Please enter a valid 10-digit phone number - 8190898989');
            return;
        }
    
        const newContact = {
          name,
          email,
          phone,
        };
    
        const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    
        const updatedContacts = [...existingContacts, newContact];
    
        
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));

        setName('');
        setEmail('');
        setPhone('');
      };    
    

  return (
    <div>
        <form action="" className='w-[30%] bg-black text-black rounded-md p-4' onSubmit={handleSubmit}>
            <input 
            type="text"  
            placeholder='Enter name'
            value={name}
            className='block border rounded-md p-2 w-[100%] mb-2'
            onChange={(e) => setName(e.target.value)} />
            <input 
            type="email"  
            placeholder='Enter email' 
            value={email}
            className='block border rounded-md p-2 w-[100%] mb-2 '
            onChange={(e) => setEmail(e.target.value)}
            />
            <input 
            type="text"  
            className='block border rounded-md p-2 w-[100%] mb-2'
            placeholder='Enter phone number'
            value={phone}
            onChange={(e) => setPhone(e.target.value)} />
            <button className='block border rounded-md p-2 w-[100%] mb-2 bg-gray-400 text-black'>Submit</button>
        </form>
    </div>
  )
}

export default ModalForm