import axios from 'axios'

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/original'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
  baseURL: backendUrl,
})

// Attach Clerk auth token to every request
export const setAuthToken = (getToken) => {
  api.interceptors.request.use(async (config) => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

// Prepend TMDB base URL if the path is relative
export const tmdbImg = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${TMDB_IMAGE_BASE}${path}`
}

export default api
