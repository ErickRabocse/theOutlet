import { NavLink } from 'react-router-dom'
import './header.scss'

const Header = () => {
  const linkIsActive = (isActive) => {
    return isActive ? 'header__item-link header__item-link--is-active' : 'header__item-link'
  }

  return (
    <div className='header__container'>
      <nav className='header'>
        <NavLink to='/' className='header__logo'>
          the Outlet
        </NavLink>
        <div className='header__searchBar'>
          <input className='header__search' type='text' />
          <button className='header__sarchBtn'>
            <img className='header__sarchIcon' src='./search.svg' alt='search icon' style={{ height: '20px' }} />
          </button>
        </div>
        <ul className='header__nav-list'>
          <li className='header__list-item'>
            <NavLink to='/' className={({ isActive }) => linkIsActive(isActive)}>Home</NavLink>
          </li>
          <li className='header__list-item'>
            <NavLink to='/dashboard' className={({ isActive }) => linkIsActive(isActive)}>Dashboard</NavLink>
          </li>
          <li className='header__list-item'>
            <NavLink to='/secret' className={({ isActive }) => linkIsActive(isActive)}>Secret</NavLink>
          </li>
          <li className='header__list-item'>
            <NavLink to='/loginPage' className={({ isActive }) => linkIsActive(isActive)}>Log in</NavLink>
          </li>
          <li className='header__list-item'>
            <NavLink to='/signupPage' className={({ isActive }) => linkIsActive(isActive)}>Sign up</NavLink>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default Header
