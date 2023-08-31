import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAdminContext } from '@/hooks/useAdmin'
import '@/styles/productDetail.scss'

const ProductDetails = () => {
  const { setOrder, order, setTotal, loggedIn, setItemsAmount, itemsAmount } = useAdminContext()
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`https://theoutlet.onrender.com/items/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(e => console.error(e))
  }, [id])

  const addToCart = (product) => {
    setBtnState(true)
    loggedIn
      ? setOrder(oldProducts => {
        const itemFound = oldProducts.find(el => el.id === product.id)
        if (itemFound) {
          alert('Item added. Please update quantity in the shopping cart.')
          return [...oldProducts]
        } else {
          setItemsAmount(itemsAmount + 1)
          return [...oldProducts, product]
        }
      })
      : alert('Please "register" or "sign in" to order from our store.')
  }

  // THIS useEffect with no dependencies, is run everytime the component//OR-setTotal state// is rerendered, and updates the total!
  useEffect(() => {
    const subTotal = order.reduce((acc, item) => {
      return acc + item.price
    }, 0)
    setTotal(subTotal)
  })

  // STYLING BUTTON AS CHECKED AFTER CLICK
  const [btnState, setBtnState] = useState(false)
  const toggleBtnClass = btnState ? 'btn btn-dark' : 'btn btn-light'

  //  NAVIGATING BACK HOME
  const navigate = useNavigate()

  const goHome = () => {
    navigate('/')
  }

  return (
    <div className='card mb-3' style={{ maxWidth: '80%', margin: '30px auto' }}>
      <div className='row g-0'>
        <div className='col-md-4'>
          <img src={product?.image || product?.images} className='img-fluid rounded-start h-100' alt={product?.description} />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <div id='title_and_close'>
              <h5 className='card-title'>{product?.product_name}</h5>
              <span className='close-details' onClick={goHome}>❌</span>
            </div>
            <p className='card-text'>{product?.description}</p>
            <p className='card-text'>
              <small className='text-body-secondary'>
                Brand: {product?.brand}
                <br />
                Price: ${product?.price}
              </small>
            </p>
            <button type='button' className={toggleBtnClass} onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetails
