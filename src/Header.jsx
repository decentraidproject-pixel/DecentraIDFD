import React, { useState } from 'react'
import logo1 from './assets/logo1.png';
import './Header.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const n=useNavigate();

  function verify(){
    n('UserLookup');
  }

  const [open,setOpen]=useState();
  return (
    <div className='body'>
      <div className='ib'>
         <img src={logo1} alt='logo' style={{width:"70px", marginLeft:"30px"}} />
        <div className='menu'>
         <p className='para' ><Link to="/">DecentralID</Link></p>
         
         <div className={`menu-bar ${open?"open":""}`} onClick={()=>setOpen(!open)}>
             <span></span>
             <span></span>
             <span></span>
          </div>


         <nav className={`nav ${open? "open" : "" }`}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact" >Contact</Link>
          <Link to="/help">Help</Link>
          <Link to="startnow" onClick={verify}>Verify🛡️</Link>
         </nav>
         </div>
      </div>
    
    </div>
  )
}

export default Header

