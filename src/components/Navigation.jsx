import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Navigation.module.css'

function Navigation() {
  return (
    <>
      <nav className={classes.navigation}>
        <div className={classes.navItem}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/signup">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      </nav>
    </>
  )
}

export default Navigation
