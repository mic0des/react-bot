import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav>
      <div className="nav-wrapper blue accent-3">
        <Link to={'/'} style={{margin: '.15em'}} className="brand-logo">DigiBento</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to={'/shop'}>Shop</Link></li>
          <li><Link to={'/about'}>About</Link></li>
        </ul>
      </div>
    </nav>
  )

export default Header;