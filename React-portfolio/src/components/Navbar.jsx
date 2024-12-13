import React, { useState } from 'react';
import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
} from 'react-icons/fa';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#0a192f] text-gray-300 z-50 shadow-lg'>
      {/* Logo */}
      <div className="font-bold text-lg">
        Chayanon Rodjanawon
      </div>

      {/* Desktop Menu */}
      <ul className='hidden md:flex space-x-6'>
        <li className="hover:text-pink-600 transition-all duration-300 cursor-pointer">
          <Link 
            to='home' 
            smooth={true} 
            duration={500} 
            offset={-80} 
            spy={true} 
            activeClass="border-b-2 border-pink-600"
            onSetActive={() => console.log("Home section is active")}
          >
            Home
          </Link>
        </li>
        
        <li className="hover:text-pink-600 transition-all duration-300 cursor-pointer">
          <Link 
            to='about' 
            smooth={true} 
            duration={500} 
            offset={-80} 
            spy={true} 
            activeClass="border-b-2 border-pink-600">
            About
          </Link>
        </li>

        <li className="hover:text-pink-600 transition-all duration-300 cursor-pointer">
          <Link 
            to='skills' 
            smooth={true} 
            duration={500} 
            offset={-80} 
            spy={true} 
            activeClass="border-b-2 border-pink-600"
          >
            Skills
          </Link>
        </li>
        <li className="hover:text-pink-600 transition-all duration-300 cursor-pointer">
          <Link 
            to='work' 
            smooth={true} 
            duration={500} 
            offset={-80} 
            spy={true} 
            activeClass="border-b-2 border-pink-600"
          >
            Work
          </Link>
        </li>
        <li className="hover:text-pink-600 transition-all duration-300 cursor-pointer">
          <Link 
            to='contact' 
            smooth={true} 
            duration={500} 
            offset={-80} 
            spy={true} 
            activeClass="border-b-2 border-pink-600"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Hamburger Menu */}
      <div onClick={handleClick} className='md:hidden z-10'>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile Menu */}
      <ul
        className={
          !nav
            ? 'hidden'
            : 'absolute top-0 left-0 w-full h-screen bg-[#0a192f] flex flex-col justify-center items-center z-40'
        }
      >
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='home' smooth={true} duration={500} offset={-80}>
            Home
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='about' smooth={true} duration={500} offset={-80}>
            About
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='skills' smooth={true} duration={500} offset={-80}>
            Skills
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='work' smooth={true} duration={500} offset={-80}>
            Work
          </Link>
        </li>
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='contact' smooth={true} duration={500} offset={-80}>
            Contact
          </Link>
        </li>
      </ul>

      {/* Social Icons */}
      <div className='hidden lg:flex fixed flex-col top-[35%] left-0'>
        <ul>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-blue-600'>
            <a 
              className='flex justify-between items-center w-full text-gray-300'
              href='https://www.linkedin.com/in/chayanon-rodjanawon-0703242a9/' 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Linkedin <FaLinkedin size={30} />
            </a>
          </li>
          <li className='w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-[#333333]'>
            <a
              className='flex justify-between items-center w-full text-gray-300'
              href='https://github.com/chayanonr'
              target="_blank" 
              rel="noopener noreferrer"
            >
              Github <FaGithub size={30} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
