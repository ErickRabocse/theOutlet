import { useEffect, useState } from 'react'
import { getAllUsersService } from '../services/userService'
import '@/styles/secret.scss'
import { useAdminContext } from '../hooks/useAdmin'

const Secret = () => {
  const [loading, setLoading] = useState(true)
  const { users, setUsers } = useAdminContext()

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const token = localStorage.getItem('jwt_token')
        const { data } = await getAllUsersService(token)
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUsersData()
  }, [])

  return (
    <>
      <h1 className='title'>Secret</h1>
      <div>
        {loading
          ? <h1>Loading users...</h1>
          : users.map(({ id, first_name, last_name, gender, email, role }) =>
            (
              <div key={id} className='card' style={{ width: '18rem' }}>
                <div className='card-header'>
                  {first_name} {last_name}
                </div>
                <ul className='list-group list-group-flush'>
                  <li className='list-group-item'><span>Gender:</span> {gender}</li>
                  <li className='list-group-item'><span>Email:</span> {email}</li>
                  <li className='list-group-item'><span>Role:</span> {role}</li>
                </ul>
              </div>

            // <div key={id}>
            //   <span>{first_name}</span><br />
            //   <span>{last_name}</span><br />
            //   <span>{gender}</span><br />
            //   <span>{email}</span><br />
            //   <span>{role}</span><br />
            // </div>
            ))}
      </div>
    </>
  )
}
export default Secret
