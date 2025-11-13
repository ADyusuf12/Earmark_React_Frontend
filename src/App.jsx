import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/dashboard/OverviewPage";
import DashboardListingsPage from "./pages/dashboard/DashboardListingsPage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import PublicProfilePage from "./pages/PublicProfilePage";
import ListingsPage from "./pages/ListingsPage";
import ListingShowPage from "./pages/ListingShowPage";
import SavedListingsPage from "./pages/SavedListingsPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/overview" element={<OverviewPage />} />
        <Route path="/dashboard/listings" element={<DashboardListingsPage />} />
        <Route path="/user_profile" element={<UserProfilePage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listings/:id" element={<ListingShowPage />} />
        <Route path="/saved" element={<SavedListingsPage />} />
        <Route path="/user_profiles/:id" element={<PublicProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
