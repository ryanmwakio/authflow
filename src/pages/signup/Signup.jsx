import React, { useState, useRef, useEffect } from 'react'
import classes from './Signup.module.css'
import logo from '../../assets/bm-11.webp'
import flashBlack from '../../assets/flash-black.svg'
import flashWhite from '../../assets/flash-white.svg'
import microscope from '../../assets/microscope.svg'
import { Link } from 'react-router-dom'
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from '../../api/axios'

function Signup() {
  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const [passwordShown, setPasswordShown] = useState(false)
  const [password2Shown, setPassword2Shown] = useState(false)

  const USER_REGEX = /^[a-zA-Z0-9]{3,20}$/
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
  const REGISTER_URL = '/register'

  //set focus when component loads
  useEffect(() => {
    userRef.current.focus()
  }, [])

  //validate username
  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  //validate password
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  //error message
  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
  }
  const togglePassword2Visiblity = () => {
    setPassword2Shown(password2Shown ? false : true)
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
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pwd)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )

      setSuccess(true)
      console.log(response.data)

      //clear state and controlled inputs
      setUser('')
      setPwd('')
      setMatchPwd('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken')
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <section className={classes.signup}>
      <div className={`container`}>
        <div className={`grid grid-cols-5 ${classes.formSection}`}>
          <div className={`col-span-2 ${classes.imageSection}`}>
            <div className={classes.logo}>
              <img src={logo} alt="bitmama logo" />
            </div>

            <div className={classes.badgeMain}>
              <div className={classes.badgePostition} title="P2P">
                <img
                  src={flashBlack}
                  alt="flash"
                  className={classes.badgeImg}
                />
                <a
                  href="https://bitmama.io/p2p-exchange"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.badgeLink}
                >
                  Peer To Peer
                </a>
              </div>
            </div>

            <div className={classes.extraInfo}>
              <div>
                <img src={microscope} alt="" className={classes.extraInfoImg} />
              </div>
              <p className={classes.extraInfoText} title="mission">
                leveraging use of the blockchain and other frontier technologies
                to solve problems in society.
              </p>
            </div>

            <div className={classes.badgeMain2}>
              <div className={classes.badge2Postition} title="Changera">
                <img
                  src={flashWhite}
                  alt="flash"
                  className={classes.badge2Img}
                />
                <a
                  href="https://www.changera.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.badge2Link}
                >
                  Send Money Fast
                </a>
              </div>
            </div>
          </div>
          <div className="md:col-span-3 col-span-5">
            <div className={classes.form}>
              <p className={classes.signinText}>
                have an account? <Link to="/login">login</Link>
              </p>
              <div className={classes.signupForm}>
                <div>
                  <h3 className={classes.signupFormTitle}>
                    Get started with Bitmama
                  </h3>
                  <p className={classes.signupFormText}>
                    Getting started is easy
                  </p>
                  {success ? (
                    <section className="successmsg">
                      <h1>Successfully registered</h1>
                      <p>
                        <Link to="/login">Login</Link>
                      </p>
                    </section>
                  ) : (
                    ''
                  )}
                  <p
                    ref={errRef}
                    className={errMsg ? 'errmsg' : 'offscreen'}
                    aria-live="assertive"
                  >
                    {errMsg}
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mt-3">
                      <label htmlFor="username">
                        Username:
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={validName ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                          icon={faTimes}
                          className={validName || !user ? 'hide' : 'invalid'}
                        />
                      </label>
                      <input
                        name="name"
                        type="text"
                        className={`form-control`}
                        placeholder="Username"
                        required
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        aria-invalid={validName ? 'false' : 'true'}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                      />
                      <p
                        id="uidnote"
                        className={
                          userFocus && user && !validName
                            ? 'instructions'
                            : 'offscreen'
                        }
                      >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        4 to 24 characters.
                        <br />
                        Must begin with a letter.
                        <br />
                        Letters, numbers, underscores, hyphens allowed.
                      </p>
                    </div>
                    {/* <div className="form-group">
                      <input
                        type="email"
                        className="form-control "
                        placeholder="Enter Email"
                        required
                      />
                    </div> */}
                    <div className={`${classes.passWrapper} form-group`}>
                      <label htmlFor="password">
                        Password:
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={validPwd ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                          icon={faTimes}
                          className={validPwd || !pwd ? 'hide' : 'invalid'}
                        />
                      </label>
                      <input
                        id="password"
                        placeholder="Password"
                        name="password"
                        type={passwordShown ? 'text' : 'password'}
                        className={`form-control`}
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? 'false' : 'true'}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                      />
                      <i onClick={togglePasswordVisiblity}>
                        {passwordShown ? eyeOff : eye}
                      </i>
                    </div>
                    <p
                      id="pwdnote"
                      className={
                        pwdFocus && !validPwd ? 'instructions' : 'offscreen'
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters.
                      <br />
                      Must include uppercase and lowercase letters, a number and
                      a special character.
                      <br />
                      Allowed special characters:{' '}
                      <span aria-label="exclamation mark">!</span>{' '}
                      <span aria-label="at symbol">@</span>{' '}
                      <span aria-label="hashtag">#</span>{' '}
                      <span aria-label="dollar sign">$</span>{' '}
                      <span aria-label="percent">%</span>
                    </p>

                    <div className={`${classes.passWrapper} form-group`}>
                      <label htmlFor="confirm_pwd">
                        Confirm Password:
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={validMatch && matchPwd ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                          icon={faTimes}
                          className={
                            validMatch || !matchPwd ? 'hide' : 'invalid'
                          }
                        />
                      </label>
                      <input
                        placeholder="Confirm Password"
                        name="passwordConfirm"
                        type={password2Shown ? 'text' : 'password'}
                        className={`form-control`}
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? 'false' : 'true'}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                      />
                      <i onClick={togglePassword2Visiblity}>
                        {password2Shown ? eyeOff : eye}
                      </i>
                    </div>
                    <p
                      id="confirmnote"
                      className={
                        matchFocus && !validMatch ? 'instructions' : 'offscreen'
                      }
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must match the first password input field.
                    </p>

                    <div className="form-group">
                      <input
                        type="submit"
                        className="form-control cursor-pointer bg-primarygreen text-white"
                        value={'Sign Up'}
                        disabled={
                          !validName || !validPwd || !validMatch ? true : false
                        }
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
