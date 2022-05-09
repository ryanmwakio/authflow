import React from 'react'
import classes from './Home.module.css'
import logo from '../../assets/bm-11.webp'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className="container">
        <section className={classes.home}>
          <div className={classes.frontBlur}>
            <div className={classes.graphic1}></div>
            <div className={classes.logo}>
              <img src={logo} alt="" />
            </div>
            <div className={classes.landingText}>
              <h2>Buy and Sell Crypto at the best prices instantly</h2>
            </div>
            <div className={classes.desc}>
              <p>
                Buy, Sell, Receive & Trade Crypto with Bitmama. To begin your
                experience, please login or register. We hope you enjoy our site
                and we look forward to seeing you again.
              </p>
              <div className={`${classes.cta} my-5`}>
                <Link to="/signup" className={`btn mr-3 ${classes.btnWhite}`}>
                  Register
                </Link>
                <Link to="/login" className={`btn ${classes.btnGreen}`}>
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
