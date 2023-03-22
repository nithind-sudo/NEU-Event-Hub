import React from 'react';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap';
import '../../../styles/ReusableStyles/Navbar/navbar.css';

const Navbar = ()=>{
    return (
        <div className='mb-5'>
            <nav className='navbar navbar-expand-md fixed-top applyNUTheme'>
                <div className='container-fluid'>
                    <a href='/' className='navbar-brand nuThemeText'>Northeastern's Events Hub</a>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cdccca" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarCollapse'>
                        <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                        <li className='nav-item'>
                            <a className='nav-link nuLink' aria-current='page' href='/'>Home</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link nuLink' href='/'>Events</a>
                        </li>
                        <li className='nav-item'>
                            <a className='nav-link nuLink' href='/'>Create New Event</a>
                        </li>
                        </ul>
                        <form className='d-flex' role='search'>
                            <input className='form-control me-2' type='search' placeholder='Search for an Event' aria-label='Search' />
                            <button className='btn nuButton' type='submit'>Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <br/>
        </div>
    );
};

export default Navbar;