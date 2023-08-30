import { useAdminContext } from '../hooks/useAdmin'
import { Link } from 'react-router-dom'
import '@/styles/home.scss'

const Home = () => {
  const { loading, error, data, filteredItems, item } = useAdminContext()

  return (
    <div className='outterHomeContainer'>
      {loading && <h3 className='loading'>Loading...</h3>}
      {error && <p className='error'>There is a problem with the server please email us at: <span style={{ color: 'blue' }}>costumer_service@theoutlet.com</span></p>}

      {/* <div className='container'>
        <div className='row'>
          {filteredItems.map(item => (
            <div key={item.id} className='col-sm-3 mb-3 mb-sm-0'>
              <div className='card'>
                <img className='card-img-top img' src={item?.image} alt={item?.description} />
                <div className='card-body'>
                  <h5 className='card-title'>{item?.product_name}</h5>
                  <p className='card-text'> ${item?.price}</p>
                  <a href='#' className='btn btn-primary'>See details</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className='container container-md'>
        <div className='row'>
          {item.length === 0
            ? data && data.map(item => (
              <div key={item.id} className='col-sm-3'>
                <div className='card'>
                  <img className='card-img-top img' src={item?.image || item?.images} alt={item?.description} />
                  <div className='card-body'>
                    <h5 className='card-title'>{item?.product_name}</h5>
                    <p className='card-text'> ${item?.price}</p>
                    <Link to={`/items/${item?.id}`} className='btn btn-primary'>See details</Link>
                  </div>
                </div>
              </div>
            ))
            : filteredItems.map(item => (
              <div key={item.id} className='col-sm-3'>
                <div className='card'>
                  <img className='card-img-top img' src={item?.image || item?.images} alt={item?.description} />
                  <div className='card-body'>
                    <h5 className='card-title'>{item?.product_name}</h5>
                    <p className='card-text'> ${item?.price}</p>
                    <Link to={`/items/${item?.id}`} className='btn btn-primary'>See details</Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

    </div>
  )
}
export default Home
