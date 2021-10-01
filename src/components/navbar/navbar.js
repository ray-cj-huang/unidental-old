import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import useWindowSize from '../../components/useWindowSize';

import './navbar.css';

export default function Navbar() {
  const size = useWindowSize();
  const mobile = (size.width <= 479); // mobile: start with 479px

  if(mobile) {
    return (
      <div>
        <nav className="navbar">
          <ul className="navbar-nav">
            <NavItem title="Home" link="/"/>
            <NavItem title="About" link="/about">
              <DropdownMenu/>
            </NavItem>
            <NavItem title="Contact" link="/contact"/>
          </ul>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav className="navbar">
          <ul className="navbar-nav">
            <NavItem title="Home" link="/"/>
            <NavItem title="About" link="/about">
              <DropdownMenu/>
            </NavItem>
            <NavItem title="Contact" link="/contact"/>
          </ul>
        </nav>
      </div>
    );
  }

}


function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <Link to={props.link} className="icon-button" onClick={() => setOpen(!open)}>{props.title}</Link>
      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            // leftIcon={<CogIcon />}
            // rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            // rightIcon={<ChevronIcon />}
            goToMenu="animals">
            Animals
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main"
            // leftIcon={<ArrowIcon />}
          >
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem
            // leftIcon={<BoltIcon />}
          >HTML</DropdownItem>
          <DropdownItem
            // leftIcon={<BoltIcon />}
          >CSS</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'animals'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main"
            // leftIcon={<ArrowIcon />}
          >
            <h2>Animals</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘">Kangaroo</DropdownItem>
          <DropdownItem leftIcon="🐸">Frog</DropdownItem>
          <DropdownItem leftIcon="🦋">Horse?</DropdownItem>
          <DropdownItem leftIcon="🦔">Hedgehog</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}