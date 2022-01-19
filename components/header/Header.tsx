import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { FaBars } from "react-icons/fa";
import Image from 'next/image';
import Menu from '../Menu';

const customStyles = {
  content: {
    top: '20px',
    right: '20px',
    left: 'auto',
    bottom: 'auto',
    // transform: 'translate(-50%, -50%)',
  },
};

const Header = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [menubtn, setMenuBTN] = React.useState('block');

  function openModal() {
    setIsOpen(true);
    setMenuBTN('none')
  }

  function closeModal() {
    setIsOpen(false);
    setMenuBTN('block')
  }
  return (
    <>
    <div 
      className='absolute top-0 z-10flex justify-between items-center h-[70px] w-full md:mt-4 px-4'
    >
      <div className="navbar-nav w-full h-full flex justify-between items-center text-white md:px-4">
        <Link href="/">
          <a className="nav-item nav-link flex items-center hover:cursor-pointer">
            <div className='hidden md:block'><Image src={'/assets/img/portfolio1.png'} width={250} height={50}/></div>
            <div className='md:hidden'><Image src={'/assets/img/portfolio1.png'} width={150} height={33}/></div>
          </a>
        </Link>

        <Link href="#">
          <a className="nav-item nav-link text-lg md:text-28 hover:cursor-pointer" style={{display:menubtn}} onClick={openModal}>
              <FaBars/>
          </a>
        </Link>
      </div>
    </div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >        
        <Menu/>
      </Modal>
    </>
  )
}

export default Header
