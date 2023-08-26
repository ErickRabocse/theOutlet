import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState(undefined)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setData(undefined)

    //   CRETING AN ABORT controller
    const controller = new AbortController()

    //   CREATING AN ABORT signal
    fetch(url, { signal: controller.signal })
      .then(res => {
        //  CHECKING STATUS ENSURES EVERYTHING WAS succussful
        if (res.status === 200) {
          return res.json()
        }
        // Promise.reject RETURNS an ERROR if something failed
        return Promise.reject(res)
      })
      .then(data => setData(data))
      .catch((e) => {
        if (e.name === 'AbortError') return
        setError(true)
      })
      .finally(() => {
        // KEEPING LOADING ON SCREEN IF site reloads
        if (controller.signal.aborted) return
        setLoading(false)
      })
    //   NOTHING WILL RUN if a new fetch request is done!
    return () => {
      controller.abort()
    }
  }, [url])

  return (
    { loading, error, data }
  )
}
export default useFetch
