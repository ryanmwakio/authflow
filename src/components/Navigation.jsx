import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Navigation.module.css'

function Navigation() {
  const pathname = window.location.pathname
  return (
    <>
      <nav className={classes.navigation}>
        <div className={classes.navItem}>
          <NavLink to="/" className={pathname === '/' ? classes.active : ''}>
            Home
          </NavLink>
          <NavLink
            to="/signup"
            className={pathname === '/signup' ? classes.active : ''}
          >
            Register
          </NavLink>
          <NavLink
            to="/login"
            className={pathname === '/login' ? classes.active : ''}
          >
            Login
          </NavLink>
        </div>
      </nav>
    </>
  )
}

export default Navigation
