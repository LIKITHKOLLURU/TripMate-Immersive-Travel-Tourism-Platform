import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MetaverseHub from './pages/MetaverseHub';
import Hotels from './pages/Hotels';
import AICompanion from './pages/AICompanion';
import Events from './pages/Events';
import NFTMarketplace from './pages/NFTMarketplace';
import EcoTravel from './pages/EcoTravel';
import CityDetail from './pages/CityDetail';
import HotelDetail from './pages/HotelDetail';
import PreviewPage from './components/PreviewPage';
import PlanTrip from './pages/PlanTrip';
import TripSummary from './pages/TripSummary';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Payment from './pages/Payment';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          <Navbar />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/metaverse" element={<MetaverseHub />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/ai-companion" element={<AICompanion />} />
              <Route path="/festivals" element={<Events />} />
              <Route path="/nft-marketplace" element={<NFTMarketplace />} />
              <Route path="/eco-travel" element={<EcoTravel />} />
              <Route path="/city/:cityId" element={<CityDetail />} />
              <Route path="/hotel/:hotelId" element={<HotelDetail />} />
              <Route path="/preview/:placeId" element={<PreviewPage />} />
              <Route path="/plan-trip" element={<PlanTrip />} />
              <Route path="/trip-summary" element={<TripSummary />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
          </motion.div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;