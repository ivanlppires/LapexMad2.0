import axios, { HttpStatusCode } from 'axios'
import router from "@/router";
import { useUserStore } from '../store/user'

const api = axios.create({
  baseURL: 'http://localhost:5000/'
})

api.interceptors.request.use(async (request) => {
  import.meta.env.NODE_ENV === 'development' && console.log('Interceptor')
  const user = useUserStore();

  if (!user.$state.expirationTime || user.$state.expirationTime - Date.now() < 60) {
    await user.updateToken();
  }

  const token = user.$state.accessToken
  if (token) {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

api.interceptors.response.use(null, (error) => {
  import.meta.env.NODE_ENV === 'development' && console.log('errorInterceptor')
  const { response } = error
  if (!response) {
    console.error(error)
    return
  }

  if (response.status === HttpStatusCode.Unauthorized) {
    router.push('/login');
  }

  const errorMessage = response.data?.message || response.statusText
  console.error('ERROR:', errorMessage)
})


export { axios, api }
