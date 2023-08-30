import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAdminContext } from '@/hooks/useAdmin'

const ProductDetails = () => {
  const { setOrder, order, setTotal } = useAdminContext()

  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch(`https://theoutlet.onrender.com/items/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(e => console.error(e))
  }, [id])

  const addToCart = (product) => {
    setOrder(oldProducts => {
      return [...oldProducts, product]
    })
  }

  // THIS useEffect with no dependencies, is run everytime the component is rerendered, and updating the total!
  useEffect(() => {
    const subTotal = order.reduce((acc, item) => {
      return acc + item.price
    }, 0)
    setTotal(subTotal)
  })

  return (
    <div className='card mb-3' style={{ maxWidth: '80%', margin: '30px auto' }}>
      <div className='row g-0'>
        <div className='col-md-4'>
          <img src={product?.image || product?.images} className='img-fluid rounded-start h-100' alt={product?.description} />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h5 className='card-title'>{product?.product_name}
            </h5>
            <p className='card-text'>{product?.description}</p>
            <p className='card-text'>
              <small className='text-body-secondary'>
                Brand: {product?.brand}
                <br />
                Price: ${product?.price}
              </small>
            </p>
            <button type='button' className='btn btn-light' onClick={() => addToCart(product)}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProductDetails
