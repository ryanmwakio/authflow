import React, { useState } from 'react'
import classes from './Login.module.css'
import logo from '../../assets/bm-11.webp'
import { Link } from 'react-router-dom'
import googleIcon from '../../assets/google.svg'
import facebookIcon from '../../assets/facebook.svg'
import icon from '../../assets/icon.svg'

function Login() {
  const [passwordShown, setPasswordShown] = useState(false)

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(event)
  }

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

  return (
    <section className={classes.signup}>
      <div className={`container`}>
        <div className={`grid grid-cols-5 ${classes.formSection}`}>
          <div className="col-span-3">
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
                  <div className="my-5">
                    <div className="btn btn-white mr-3">
                      <img src={googleIcon} alt="google icon" />
                      <span>Google</span>
                    </div>
                    <div className="btn btn-white">
                      <img src={facebookIcon} alt="facebook icon" />
                      <span>Facebook</span>
                    </div>
                  </div>
                  <p className={classes.signupFormText}>or continue with</p>
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control "
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                    <div className={`${classes.passWrapper} form-group`}>
                      <input
                        placeholder="Password"
                        name="password"
                        type={passwordShown ? 'text' : 'password'}
                        className="form-control"
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
