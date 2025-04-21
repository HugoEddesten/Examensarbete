import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppRoutes from './routes/AppRoutes'
import { SidebarProvider } from './contexts/SidebarContext'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppRoutes />
        </SidebarProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
