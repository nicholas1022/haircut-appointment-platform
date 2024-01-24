import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../images/scissor.png';
import { useAuth } from "../contexts/AuthContext";

function Header() {

  const { currentUser, userInfo, logout } = useAuth();
  const [userName, setUserName] = useState(currentUser == null ? "" : userInfo.firstName + ' ' + userInfo.lastName);
  const [top, setTop] = useState(true);
  const [userId,setUserId] = useState(currentUser==null?'':currentUser.uid);
  const [menu, setMenu] = React.useState(false);

  //for dropdown menu
  const handleOpen = () => {
    setMenu(!menu);
  };

  const signOut = async () => {
    await logout();
    setUserName("");
    setUserId('');
    // Sign-out successful.
    window.location.href = "/";
  }
  
  // detect whether user has scrolled the page down by 10px 
  useEffect(() => {
    
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true)
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);  

  return (
    <header className={`fixed w-full z-30  bg-white transition duration-300 ease-in-out ${!top && 'bg-white backdrop-blur-sm shadow-lg'}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Site branding */}
          <div className="flex-shrink-0 mr-4">
            {/* Logo */}
            <Link to="/" className="block" aria-label="Cruip">
              <img width="32" height="32" className="" src={Icon}/>
              {/* <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="header-logo">
                    <stop stopColor="#4FD1C5" offset="0%" />
                    <stop stopColor="#81E6D9" offset="25.871%" />
                    <stop stopColor="#338CF5" offset="100%" />
                  </radialGradient>
                </defs>
                <rect width="32" height="32" rx="16" fill={Icon} fillRule="nonzero" />
              </svg> */}
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">

              {userId == ''?(            
              <ul className="flex flex-grow justify-end flex-wrap items-center"><li>
                <Link to="/signin" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Sign in</Link>
              </li>
              <li>
                <Link to="/stylists" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                <span>Find a stylist</span>
                <svg className="w-3 h-3 fill-current text-gray-400 flex-shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
                </svg>    
                </Link>
              </li></ul>
            
            )
            :
            (
              <ul className="flex flex-grow justify-end flex-wrap items-center"><li>
               <button onClick={handleOpen} className="relative font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">{userName}&nbsp;
                  <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                 </svg>
                </button>
              {menu ? (userInfo.role != "STYLIST" ? (
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a href="/user" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View Profile</a>
                    </li>
                    <li>
                      <a href="/stylists" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">New Booking</a>
                    </li>
                    <li>
                      <a href={"/cust-bookings/"+currentUser.uid} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">My Bookings</a>
                    </li>
                  </ul>
                </div>
                ):(
                <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <a href="/stylist/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View Profile</a>
                    </li>
                    <li>
                      <a href="/stylist/bookings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">View Bookings</a>
                    </li>
                  </ul>
                 </div>))  :(
              <div></div>)}
            </li>
            <li>
              <button className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" onClick={()=>signOut()}>
              <span>Sign Out</span>
              </button>
            </li></ul>)}

          </nav>

        </div>
      </div>
    </header>
  );
}

export default Header;
