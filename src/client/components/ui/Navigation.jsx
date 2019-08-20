import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, NavLink, Link} from 'react-router-dom';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import UserNav from '../user/UserNav';

const Navigation = ({ path }) => {
  const { basket, profile, isAuth, isAuthenticating } = useSelector(state => ({
    basket: state.basket,
    profile: state.profile,
    isAuth: !!state.auth.id && !!state.auth.type,
    isAuthenticating: state.app.isAuthenticating
  }));
  const navbar = useRef(null);

  const getStyleProperty = (property) => {
    return getComputedStyle(document.documentElement).getPropertyValue(property);
  };

  document.addEventListener('scroll', () => {
    if (navbar.current) {
      if (window.pageYOffset === 0) {
        navbar.current.style.background = getStyleProperty('--nav-bg');
        navbar.current.style.boxShadow = 'none';
      } else {
        navbar.current.style.background = getStyleProperty('--nav-bg-scrolled');
        navbar.current.style.boxShadow = getStyleProperty('--nav-bg-shadow');
      }
    }
  });

  return (
    <nav 
        className="navigation"
        ref={navbar}
    >
      <div className="logo">
        <Link to="/">
          <h2>SALINAKA</h2>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <NavLink 
              activeClassName="navigation-menu-active"
              className="navigation-menu-link"
              exact
              to="/" 
          >
            Store
          </NavLink>
        </li>
        <li className="navigation-menu-item">
          <BasketToggle>
            {({ onClickToggle }) => (
              <a href="" className="navigation-menu-link" onClick={onClickToggle}>
                <Badge count={basket.length}/>
                My Basket
              </a>
            )}
          </BasketToggle>
        </li>
        {isAuth ? (
          <li className="navigation-menu-item">
            <UserNav isAuthenticating={isAuthenticating} profile={profile} />
          </li>
        ) : (
          <li className="navigation-action">
            {(path === '/signin' || path === '/') && (
              <NavLink 
                  activeClassName="navigation-menu-active"
                  className="button button-small"
                  exact
                  to="/signup" 
              >
                Sign Up
              </NavLink>
            )}
            {(path === '/signup' || path === '/') && (
                <NavLink 
                    activeClassName="navigation-menu-active"
                    className="button button-small button-muted margin-left-s"
                    exact
                    to="/signin" 
                >
                  Sign In
                </NavLink>
            )}
          </li>
        )} 
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
