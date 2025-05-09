'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import { navItems } from '../constants';
import logo from './logo/logo.jpg';

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <Image
              src={logo}
              className="h-10 w-10 mr-2"
              alt="logo"
            />
            <span className="text-xl text-white tracking-tight">Billions Forex</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">

              <a href="#login-section" className="py-2 px-3 border rounded-md">Sign In</a>

            <a href="#login-section" className="bg-gradient-to-r from-blue-600 to-blue-800 py-2 px-3 rounded-md">
              Create an account
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
        <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="py-4">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className=" flex space-x-6">
            <a href="#login-section" className="py-2 px-3 border rounded-md">
              Sign In
            </a>
            <a href="#login-section" className="py-2 px-3 rounded-md bg-gradient-to-r from-blue-600 to-blue-800">
              Create an account
            </a>
          </div>
        </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
