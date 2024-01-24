import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { getUser, updateUserDetails} from "../network/userCrud";

function UserBlock() {

  const { currentUser, userInfo, login, setError } = useAuth();
  const [user, setUser] = React.useState('');

  
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');



  useEffect(() => {
    // if(currentUser!=null){
      getUser(currentUser.uid).then((res) => {
        console.log('test');
        setUser(res);
        setFirstName(res.firstName);
        setLastName(res.lastName);
        setPhone(res.phone);
      });
    // }
  }, []);

  const handleSubmit = (event) => {

    updateUserDetails(currentUser.uid,{
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    });
  };


  return (

      <section className="relative">
          <div className='text-lg mt-4 md:mt-4 h-96'>
            {/* Form */}
            <div className="max-w-sm mx-auto">
                <form onSubmit={(e)=>handleSubmit(e)}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">FirstName</label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" defaultValue={user.firstName} onChange={(e) => setFirstName(e.target.value)}/>
                   </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Last Name</label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" defaultValue={user.lastName} onChange={(e) => setLastName(e.target.value)}/>
                   </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4 ">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Email</label>
                      <input id="name" type="text" className="form-input w-full text-gray-800  bg-black-50 bg-slate-50" value={user.email} disabled/>
                   </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Phone</label>
                      <input id="name" type="text" className="form-input w-full text-gray-800" defaultValue={user.phone} onChange={(e) => setPhone(e.target.value)}/>
                   </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-rose-700 hover:bg-rose-800 w-full">Update Profile</button>
                    </div>
                  </div>
                </form>
              </div>
          </div>
      </section>
  )

}

export default UserBlock;