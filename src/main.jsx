
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/Router.jsx'
import AuthProvider from './Provider/AuthProvider.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='font-poppins'>
     <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  </QueryClientProvider>
  </div>,
)
