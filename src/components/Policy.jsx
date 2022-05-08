import React from 'react'
import classes from './Policy.module.css'

function Policy() {
  return (
    <div className={`my-3  ${classes.policy}`}>
      <a href="http://" target="_blank" rel="noopener noreferrer">
        By continuing you indicate that you read and agreed to the Terms of Use
      </a>
    </div>
  )
}

export default Policy
