import '@/styles/shoppingCart.scss'

const ShoppingCart = ({ name, image, price, id, handleDelete }) => {
  return (
    <div className='shoppingCart'>
      <img src={image} alt={name} className='shoppingCart__img' />
      <div className='shoppingCart__content'>
        {name}
        <label className='shoppingCart__price'>
          ${price}
        </label>
      </div>
      <button className='shoppingCart__btn' onClick={() => handleDelete(id)}>❌</button>
    </div>
  )
}
export default ShoppingCart
