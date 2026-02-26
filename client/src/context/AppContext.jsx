import { createContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import api, { setAuthToken } from "../lib/api";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || '₹'
  const { getToken } = useAuth()

  const [shows, setShows] = useState([])
  const [showsLoading, setShowsLoading] = useState(true)

  // Set up auth token interceptor once
  useEffect(() => {
    setAuthToken(getToken)
  }, [getToken])

  // Fetch all movies/shows (used on Movies, Featured, ShowMore pages)
  const fetchShows = async () => {
    try {
      setShowsLoading(true)
      const { data } = await api.get('/api/show/all')
      if (data.success) {
        setShows(data.shows)
      }
    } catch (error) {
      console.error('Failed to fetch shows:', error.message)
    } finally {
      setShowsLoading(false)
    }
  }

  useEffect(() => {
    fetchShows()
  }, [])

  const value = {
    currency,
    shows,
    showsLoading,
    fetchShows,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
