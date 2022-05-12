import React, { useContext, useState, useEffect } from 'react'
import classes from './Profile.module.css'
import AuthContext from '../../context/AuthProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Profile() {
  let [users, setUsers] = useState([])
  let [user, setUser] = useState('')

  let [activeUsers, setActiveUsers] = useState([])
  let [idleUsers, setIdleUsers] = useState([])

  const { auth } = useContext(AuthContext)

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from.pathname || '/login'

  useEffect(() => {
    let userFromLocalStorage = JSON.parse(localStorage.getItem('user'))

    //check if user is logged in
    if (!userFromLocalStorage) {
      navigate(from, { replace: true })
    } else {
      setUser(userFromLocalStorage)
    }

    let activeUsersFromLocalStorage = JSON.parse(
      localStorage.getItem('activeUsers'),
    )
    if (activeUsersFromLocalStorage) {
      setActiveUsers(activeUsersFromLocalStorage)
    }

    //updating the idle users
    let myIdleUsers = JSON.parse(localStorage.getItem('idleUsers'))
    if (myIdleUsers) {
      let allMyIdleUsers = myIdleUsers.filter((user) => {
        return !activeUsers.includes(user)
      })
      console.log(allMyIdleUsers)
      setIdleUsers(allMyIdleUsers)
      //update the local storage with the new idleUsers array
      localStorage.setItem('idleUsers', JSON.stringify(allMyIdleUsers))
    }
  }, [auth])

  const handleLogout = (name) => {
    //check idle user array exist in local storage
    let idleUsersFromLocalStorage = JSON.parse(
      localStorage.getItem('idleUsers'),
    )
    if (!idleUsersFromLocalStorage) {
      let idleUsers = [name]
      localStorage.setItem('idleUsers', JSON.stringify(idleUsers))
      setIdleUsers(idleUsers)
    } else {
      let idleUsers = idleUsersFromLocalStorage
      idleUsers.push(name)
      localStorage.setItem('idleUsers', JSON.stringify(idleUsers))
      setIdleUsers(idleUsers)
    }

    //
    let allActiveUsers = JSON.parse(localStorage.getItem('activeUsers'))
    //remove name from allActiveUsers without using splice method
    let index = allActiveUsers.indexOf(name)
    allActiveUsers.splice(index, 1)

    localStorage.setItem('activeUsers', JSON.stringify(allActiveUsers))
    setActiveUsers(allActiveUsers)
    if (name === user) {
      localStorage.removeItem('user')
      navigate(from, { replace: true })
    }
  }

  return (
    <>
      <section className={classes.profile}>
        <div className={classes.profileContent}>
          <h1 className={classes.title}>Track All Profiles</h1>
          <div className={classes.currentProfile}>
            <div>
              <div>
                <span className={classes.activeProfileIndicator}></span>

                <p className={`${classes.profileInfo} mt-3`}>
                  {user ? user : 'No profiles found'}
                  <button
                    className="btn"
                    onClick={() => {
                      handleLogout(user)
                    }}
                  >
                    logout
                  </button>
                </p>
              </div>
            </div>
          </div>
          <hr />

          <div className="my-3">
            <ul className={classes.users}>
              <h1 className="text-center">Active Users</h1>
              {activeUsers &&
                activeUsers.map((user, index) => (
                  <li key={index}>
                    <span>#{index + 1}</span>
                    <span>{user.user}</span>{' '}
                    <span className={classes.profileActive}>active</span>{' '}
                    <button
                      className={`btn ${classes.btnProfileActive}`}
                      onClick={() => {
                        handleLogout(user.user)
                      }}
                    >
                      logout
                    </button>
                  </li>
                ))}
              <p className="bg-gray-300 p-2"></p>
              <h1 className="text-center">
                {idleUsers.length > 0 && 'Idle users'}
              </h1>
              {idleUsers &&
                idleUsers.map((user, index) => (
                  <li key={index}>
                    <span>#{index + 1}</span>
                    <span>{user}</span>{' '}
                    <span className={classes.profileIdle}>idle</span>{' '}
                    <button className={`btn ${classes.btnProfileIdle}`}>
                      logout
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default Profile
