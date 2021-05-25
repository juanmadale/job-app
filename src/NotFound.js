import React from 'react'
import './NotFound.scss';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="NotFound">
      <h1>Oops!</h1>
      <h2>We can't seem to find the page you are looking for.</h2>
      <h3>Error code: 404</h3>
      <Link to={`/`}><p>Don't worry, just keep looking.</p></Link>
    </div>
  )
}
export default NotFound;