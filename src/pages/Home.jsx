import { useState } from 'react'
import useFetch from '../Hooks/useFetch'
import '@/styles/home.scss'

const Home = () => {
  const BASE_URL = 'https://theoutlet.onrender.com/items'
  const [url] = useState(BASE_URL)
  const { loading, error, data } = useFetch(url)
  return (
    <>
      {loading && <h3>Loading...</h3>}
      {error && <p>There is a problem with the server please email us at: <span style={{ color: 'blue' }}>costumer_service@theoutlet.com</span></p>}
      {data &&
        <div className='container'>
          <div className='row'>
            {
          data.map(item => (
            <div key={item.id} className='col-sm-3 mb-3 mb-sm-0'>
              <div className='card'>
                <img className='card-img-top' src={item.image} alt={item.description} style={{ height: '300px', width: '100%', objectFit: 'contain' }} />
                <div className='card-body'>
                  <h5 className='card-title'>{item.product_name}</h5>
                  <p className='card-text'> ${item.price}</p>
                  <a href='#' className='btn btn-primary'>See details</a>
                </div>
              </div>
            </div>
          ))
        }
          </div>

        </div>}
    </>
  )
}
export default Home
