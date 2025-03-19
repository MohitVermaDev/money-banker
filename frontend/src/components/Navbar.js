import React from 'react';
import UpperNavbar from './UpperNavbar';
import BottomNavbar from './BottomNavbar';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/plugins/fontawesome-free/css/all.min.css';

const Navbar = () => {

  return (
    <>
        <UpperNavbar />
        <BottomNavbar />
    </>
  );
};

export default Navbar;
