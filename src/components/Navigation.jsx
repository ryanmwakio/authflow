import React, { useEffect, useState, useContext } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import classes from './Navigation.module.css'
import AuthContext from '../context/AuthProvider'

function Navigation() {
  const pathname = window.location.pathname
  const [user, setUser] = useState('')
  const [activeUsers, setActiveUsers] = useState([])
  const [idleUsers, setIdleUsers] = useState([])
  const [allUsers, setAllUsers] = useState([])

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from.pathname || '/profile'

  //get user from local storage from the user key
  useEffect(() => {
    let userFromLocalStorage = JSON.parse(localStorage.getItem('user'))
    if (userFromLocalStorage) {
      setUser(userFromLocalStorage)
    }
  }, [])

  const logOutIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  )

  const handleLogout = (name) => {
    let activeUsers = JSON.parse(localStorage.getItem('activeUsers'))
    let index = activeUsers.indexOf(name)
    activeUsers.splice(index, 1)
    localStorage.setItem('activeUsers', JSON.stringify(activeUsers))
    setActiveUsers(activeUsers)
    if (name === user) {
      localStorage.removeItem('user')
      navigate(from, { replace: true })
    }
    window.location.reload()
  }

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
          <NavLink
            to="/profile"
            className={pathname === '/profile' ? classes.active : ''}
          >
            Profile
          </NavLink>
        </div>
      </nav>
    </>
  )
}

export default Navigation
