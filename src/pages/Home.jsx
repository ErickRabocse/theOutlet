import { useEffect, useState } from 'react'

const Home = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    fetch('https://theoutlet.onrender.com/items')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setItems(data)
      })
  }, [])
  return (
    <>
      {
      items.map(item => (
        <div key={item.key}>{item.description}</div>
      ))
    }

    </>
  )
}
export default Home
