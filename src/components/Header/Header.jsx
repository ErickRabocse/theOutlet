import { NavLink } from 'react-router-dom'
import { useAdminContext } from '@/hooks/useAdmin'
import ShoppingCart from '@/pages/ShoppingCart'
import '@/styles/header.scss'

const Header = () => {
  const { logout, isAdmin, data, item, setItem, setFilteredItems, loggedIn, userName, order, setOrder } = useAdminContext()

  const linkIsActive = (isActive) => {
    return isActive ? 'header__item-link header__item-link--is-active' : 'header__item-link'
  }

  const showItems = () => {
    const filteredStuff = data.filter(el => el.product_name.toLowerCase().includes(item.toLowerCase().trim()))
    setFilteredItems(filteredStuff)
  }

  const deleteItem = (id) => {
    const newArr = order.filter(el => el.id !== id)
    setOrder(newArr)
  }

  return (
    <nav className='header'>
      <NavLink to='/' className='header__logo'>
        the Outlet
      </NavLink>

      <div className='header__searchBar'>
        <input className='header__search' type='text' value={item} onChange={(e) => setItem(e.target.value)} />
        <button className='header__sarchBtn' onClick={showItems}>
          🔎
          {/* <img className='header__sarchIcon' src='./search.svg' alt='search icon' style={{ height: '20px' }} /> */}
        </button>
      </div>

      <ul className='header__nav-list'>
        <li className='header__list-item'>
          <NavLink to='/' className={({ isActive }) => linkIsActive(isActive)}>Home</NavLink>
        </li>
        {
          isAdmin &&
            <li className='header__list-item'>
              <NavLink to='/dashboard' className={({ isActive }) => linkIsActive(isActive)}>Dashboard</NavLink>
            </li>
        }
        {
            isAdmin &&
              <li className='header__list-item'>
                <NavLink to='/secret' className={({ isActive }) => linkIsActive(isActive)}>Secret</NavLink>
              </li>
          }
        {
            !loggedIn
              ? <li className='header__list-item header__list-item--login'>
                <NavLink to='/loginPage' className={({ isActive }) => linkIsActive(isActive)}>Log in</NavLink>
                </li>
              : <span className='header__welcome-message'>Hi {userName}</span>
          }
        {
            !loggedIn &&
              <li className='header__list-item'>
                <NavLink to='/signupPage' className={({ isActive }) => linkIsActive(isActive)}>Sign up</NavLink>
              </li>
          }
        {
            loggedIn &&
              <li className='header__list-item'>
                <NavLink className='header__logOut' to='/' onClick={logout}>Log out</NavLink>
              </li>
          }
        {
            loggedIn &&
              <li className='header__list-item'>
                <button className='header__shopping-cart' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasRight' aria-controls='offcanvasRight'>🛒</button>
                <div className='offcanvas offcanvas-end' tabIndex='-1' id='offcanvasRight' aria-labelledby='offcanvasRightLabel'>
                  <div className='offcanvas-header'>
                    <h5 className='offcanvas-title' id='offcanvasRightLabel'>Shopping list</h5>
                    <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Close' />
                  </div>
                  <div className='offcanvas-body'>
                    {
                      order.map(item => (
                        <span key={item.id}>
                          <ShoppingCart name={item.product_name} image={item?.image || item?.images} price={item.price} id={item.id} handleDelete={deleteItem} />
                        </span>
                      ))
                    }
                  </div>
                </div>
              </li>
          }
      </ul>
    </nav>
  )
}

export default Header
