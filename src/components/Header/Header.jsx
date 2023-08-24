import { NavLink } from 'react-router-dom'
import '@/styles/header.scss'
import { useAdminContext } from '../../hooks/useAdmin'

const Header = () => {
  const { logout, isAdmin, data, item, setItem, setFilteredItems } = useAdminContext()

  const linkIsActive = (isActive) => {
    return isActive ? 'header__item-link header__item-link--is-active' : 'header__item-link'
  }

  const showItems = () => {
    console.log('THIS IS DATA', data)
    console.log('THIS IS THE ITEM TYPED', item)
    const filteredStuff = data.filter(el => el.product_name.toLowerCase().includes(item.toLowerCase()))
    console.log('THESE ARE THE ITEMS FILTERED', filteredStuff)
    setFilteredItems(filteredStuff)
  }

  return (
    <div className='header__container'>
      <nav className='header'>
        <NavLink to='/' className='header__logo'>
          the Outlet
        </NavLink>
        <div className='header__searchBar'>
          <input className='header__search' type='text' value={item} onChange={(e) => setItem(e.target.value)} />
          <button className='header__sarchBtn' onClick={showItems}>
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
          {
            isAdmin &&
              <li className='header__list-item'>
                <NavLink to='/secret' className={({ isActive }) => linkIsActive(isActive)}>Secret</NavLink>
              </li>
          }
          <li className='header__list-item'>
            <NavLink to='/loginPage' className={({ isActive }) => linkIsActive(isActive)}>Log in</NavLink>
          </li>
          <li className='header__list-item'>
            <NavLink to='/signupPage' className={({ isActive }) => linkIsActive(isActive)}>Sign up</NavLink>
          </li>
          <li className='header__list-item'>
            <NavLink to='/' onClick={logout}>Log out</NavLink>
          </li>
        </ul>
      </nav>
    </div>

  )
}

export default Header
