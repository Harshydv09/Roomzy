import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/Layout/Layout";
import Home from "@/Pages/Home";
import Rooms from "@/Pages/Rooms";
import RoomDetail from "@/Pages/RoomDetail";
import Dashboard from "@/Pages/Dashboard";
import AboutUs from "@/Pages/AboutUs";
import HowItWorks from "@/Pages/HowItWorks";
import Profile from "@/Pages/Profile";
import Login from "@/Pages/Login";
import Signup from "@/Pages/Signup"; 
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Layout-wrapped routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="room/:id" element={<RoomDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
