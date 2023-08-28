import { useAdminContext } from '../hooks/useAdmin'
import '@/styles/home.scss'

const Home = () => {
  const { loading, error, data, filteredItems, item } = useAdminContext()

  return (
    <>
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

      <div className='container'>
        <div className='row'>
          {item.length === 0
            ? data && data.map(item => (
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
            ))
            : filteredItems.map(item => (
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
      </div>

    </>
  )
}
export default Home
