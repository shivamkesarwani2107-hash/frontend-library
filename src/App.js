import { BrowserRouter, Routes, Route } from "react-router-dom"
import User from "./frontend/user.js";
import Signup from "./frontend/signup";
import Login from "./frontend/login.js";
import AddBook from "./frontend/addbook.js";
import Profile from "./frontend/profile.js";
import Read from "./frontend/read.js";
import Wishlist from "./frontend/wishlist.js";
import EditBook from "./frontend/editbook.js";
import GoodBye from "./frontend/goodbye.js"
import ProtectedRoute from "./frontend/ProtectedRoute.js";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={
          <User />
        } />

        <Route path="/signup" element={
          <Signup />
        } />

        <Route path="/login" element={
          <Login />
        } />

        <Route path="/addbook" element={<ProtectedRoute>
          <AddBook />
        </ProtectedRoute>} />

        <Route path="/profile" element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />

        <Route path="/read" element={<ProtectedRoute>
          <Read />
        </ProtectedRoute>} />

        <Route path="/wishlist" element={<ProtectedRoute>
          <Wishlist />
        </ProtectedRoute>} />

        <Route path="/editbook/:id" element={<ProtectedRoute>
          <EditBook />
        </ProtectedRoute>} />

        <Route path="/goodbye" element={
          <GoodBye />
        } />

      </Routes>
    </BrowserRouter>
  )
}