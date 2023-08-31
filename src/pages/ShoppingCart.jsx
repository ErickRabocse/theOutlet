import { useAdminContext } from '@/hooks/useAdmin'
import '@/styles/shoppingCart.scss'
import { useState } from 'react'

const ShoppingCart = ({ name, image, price, id, handleDelete }) => {
  const { setOrder, setItemsAmount, itemsAmount } = useAdminContext()
  const [quantity, setQuantity] = useState(1)
  const rest = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      quantityPriceDecrement()
      setItemsAmount(itemsAmount - 1)
    } else {
      handleDelete(id)
      setItemsAmount(itemsAmount - 1)
    }
  }
  const add = () => {
    setQuantity(quantity + 1)
    quantityPriceIncrement()
    setItemsAmount(itemsAmount + 1)
  }

  const quantityPriceIncrement = () => {
    setOrder(oldProducts => {
      const itemFound = oldProducts.find(item => item.id === id)
      if (itemFound) {
        return oldProducts.map(item => {
          if (item.id === id) {
            const itemOriginalPrice = price / quantity
            console.log('THIS IS THE ORIGINAL PRICE, increment', itemOriginalPrice)
            return { ...item, price: item.price + itemOriginalPrice }
          } else {
            return item
          }
        })
      } else {
        return [...oldProducts]
      }
    })
  }

  const quantityPriceDecrement = () => {
    setOrder(oldProducts => {
      const itemFound = oldProducts.find(item => item.id === id)
      if (itemFound) {
        return oldProducts.map(item => {
          if (item.id === id) {
            const itemOriginalPrice = price / quantity
            console.log('THIS IS THE ORIGINAL PRICE, decrement', itemOriginalPrice)
            return { ...item, price: item.price - itemOriginalPrice }
          } else {
            return item
          }
        })
      } else {
        return [...oldProducts]
      }
    })
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
