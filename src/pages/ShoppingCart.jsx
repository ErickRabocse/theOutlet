// import { useAdminContext } from '@/hooks/useAdmin'
import '@/styles/shoppingCart.scss'
import { useState } from 'react'

const ShoppingCart = ({ name, image, price, id, handleDelete }) => {
  const [quantity, setQuantity] = useState(1)
  const rest = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    } else {
      handleDelete(id)
    }
  }

  const add = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div key={id} className='shoppingCart'>
      <img src={image} alt={name} className='shoppingCart__img' />
      <div className='shoppingCart__content'>
        {name}
        <label className='shoppingCart__price'>
          ${price}
        </label>
        <div className='shoppingCart__quantity-management'>
          <span className='shoppingCart__quantity-btn' onClick={() => rest()}>-</span>
          <span className='shoppingCart__quantity'>{quantity}</span>
          <span className='shoppingCart__quantity-btn' onClick={() => add()}>+</span>
        </div>

      </div>
      <button className='shoppingCart__btn' onClick={() => handleDelete(id)}>❌</button>
    </div>
  )
}
export default ShoppingCart
