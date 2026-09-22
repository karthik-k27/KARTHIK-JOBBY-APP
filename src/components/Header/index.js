import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const getLoggedout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar-container">
      <div className="nav-content">
        <Link to="/" className="nav-link">
          <img
            className="header-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-options-container">
          <Link to="/" className="nav-link">
            <li className="nav-item">Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li className="nav-item">Jobs</li>
          </Link>
        </ul>
        <button className="logout-button" type="button" onClick={getLoggedout}>
          Logout
        </button>
        <ul className="mobile-nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <AiFillHome className="menu-icon" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">
              <BsBriefcaseFill className="menu-icon" />
            </Link>
          </li>
          <li className="nav-item">
            <button
              className="mobile-logout-button"
              type="button"
              onClick={getLoggedout}
            >
              <FiLogOut className="menu-icon" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
