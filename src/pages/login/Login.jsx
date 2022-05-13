import React, { useState, useRef, useEffect, useContext } from 'react'
import useAuth from '../../hooks/useAuth'
import classes from './Login.module.css'
import logo from '../../assets/bm-11.webp'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import icon from '../../assets/icon.svg'
import axios from '../../api/axios'
import useInput from '../../hooks/useInput'
import useToggle from '../../hooks/useToggle'
import AuthContext from '../../context/AuthProvider'

const LOGIN_URL = '/auth'
function Login() {
  const [users, setUsers] = useState([])
  const { setAuth, auth } = useContext(AuthContext)
  const [passwordShown, setPasswordShown] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from.pathname || '/profile'

  const userRef = useRef()
  const errRef = useRef()

  const [user, resetUser, userAttribs] = useInput('user', '')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [check, toggleCheck] = useToggle('persist', false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  let eye = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  )

  let eyeOff = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setAuth({ user, pwd })

      //create a users array in local storage with an empty array if it doesn't exist
      if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]))
      }

      if (!localStorage.getItem('activeUsers')) {
        localStorage.setItem('activeUsers', JSON.stringify([]))
      }
      const users = JSON.parse(localStorage.getItem('users'))
      const activeUsers = JSON.parse(localStorage.getItem('activeUsers'))
      const userIndex = users.findIndex(
        (user) => user.user === userRef.current.value,
      )
      if (userIndex === -1) {
        users.push({ user: userRef.current.value, pwd: pwd })
        localStorage.setItem('users', JSON.stringify(users))
      }
      const activeUserIndex = activeUsers.findIndex(
        (user) => user.user === userRef.current.value,
      )
      if (activeUserIndex === -1) {
        activeUsers.push({ user: userRef.current.value, pwd: pwd })
        localStorage.setItem('activeUsers', JSON.stringify(activeUsers))
      }

      resetUser()
      setPwd('')
      navigate(from, { replace: true })
    } catch (err) {
      if (!err.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <section className={classes.signup}>
      <div className={`container`}>
        <div className={`grid grid-cols-5 ${classes.formSection}`}>
          <div className="md:col-span-3 col-span-5">
            <div className={classes.form}>
              <p className={classes.signinText}>
                don't have an account? <Link to="/signup">sign up</Link>
              </p>
              <div className={classes.signupForm}>
                <div>
                  <h3 className={classes.signupFormTitle}>Welcome Back</h3>
                  <p className={classes.signupFormText}>
                    Login into your account
                  </p>

                  <p
                    ref={errRef}
                    className={errMsg ? 'errmsg' : 'offscreen'}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                      <label htmlFor="username">Username:</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter Username"
                        required
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        {...userAttribs}
                      />
                    </div>

                    <div className={`${classes.passWrapper} form-group`}>
                      <label htmlFor="password">Password:</label>
                      <input
                        placeholder="Password"
                        name="password"
                        type={passwordShown ? 'text' : 'password'}
                        className="form-control"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                      />
                      <i onClick={togglePasswordVisiblity}>
                        {passwordShown ? eyeOff : eye}
                      </i>
                    </div>

                    <div className="form-group">
                      <input
                        type="submit"
                        className="form-control cursor-pointer bg-primarygreen text-white"
                        value={'Login'}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-span-2 ${classes.imageSection}`}>
            <div className={classes.logo}>
              <img src={logo} alt="bitmama logo" />
            </div>

            <div className={classes.extraInfo}>
              <div>
                <img src={icon} alt="" className={classes.extraInfoImg} />
              </div>
              <p className={classes.extraInfoText} title="mission">
                Highly-secured and fast-growing crypto platform to buy, sell or
                trade Bitcoin, Ethereum, Ripple, Celo and other cryptocurrencies
                at the best rates.in society.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
