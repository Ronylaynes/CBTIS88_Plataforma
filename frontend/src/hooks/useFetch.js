import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios({
        url,
        method: options.method || 'GET',
        data: options.data,
        headers: options.headers,
        ...options
      })

      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url && !options.manual) {
      fetchData()
    }
  }, [url])

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}