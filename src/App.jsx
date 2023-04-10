import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Layout from "./Layout"
import PlacePage from "./pages/PlacePage"
import BookingsPage from "./pages/BookingsPage"
import AccommodationsPage from "./pages/AccommodationsPage"
import CreatePage from "./pages/CreatePage"

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/accommodations" element={<AccommodationsPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
