import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import OperatorDetail from './pages/OperatorDetail'
import CustomerDashboard from './pages/CustomerDashboard'
import OperatorDashboard from './pages/OperatorDashboard'
import AdminPanel from './pages/AdminPanel'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/operator/:id" element={<OperatorDetail />} />
      <Route path="/dashboard" element={<CustomerDashboard />} />
      <Route path="/operator-dashboard" element={<OperatorDashboard />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
