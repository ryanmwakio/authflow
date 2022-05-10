import React from 'react'
import classes from './Error.module.css'
import errImg from '../../assets/404.svg'
import logo from '../../assets/bm-11.webp'

function Error() {
  return (
    <>
      <section className={classes.error}>
        <div className={classes.messageSection}>
          <div className={`grid grid-cols-4 ${classes.centerMessage}`}>
            <div className="col-span-3 md:col-span-2">
              <img src={logo} alt="logo" className={classes.logoImg} />
              <h1 className={classes.title}>Ooops...</h1>
              <p className={`${classes.message} my-3`}>page not found</p>
              <p className={classes.messageText}>
                Sorry the content you're looking for doesn't exist.Either it was
                removed or you mistyped the link.
              </p>
            </div>
            <div className={`${classes.imgGraphic} md:col-span-2`}>
              <img src={errImg} alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Error
