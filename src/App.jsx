import {} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import User_Dashboard from "./Pages/user/User_Dashboard";
import Superdashboard from "./Pages/SuperAdmin/Superdashboard";
import AllBranches from "./Pages/SuperAdmin/AllBranches";
import Ssuggestions from "./Pages/SuperAdmin/Ssuggestions";
import SsingleBranch from "./Pages/SuperAdmin/SsingleBranch";
import Scomplaints from "./Pages/SuperAdmin/Scomplaints";
import User_Suggestions from "./Pages/user/User_Suggestions";
import Branch_Profile from "./Pages/user/Branch_Profile";
import User_Makatibs from "./Pages/user/User_Makatibs";
import User_Masajid from "./Pages/user/User_Masajid";
import User_Gallery from "./Pages/user/User_Gallery";
import User_Jalsa from "./Pages/user/User_Jalsa";
import User_Darululoom from "./Pages/user/User_Darululoom";
import User_Library from "./Pages/user/User_Library";
import User_Ulama from "./Pages/user/User_Ulama";
import User_Meetings from "./Pages/user/User_Meetings";
import User_Women from "./Pages/user/User_Women";
import User_MasajidCon from "./Pages/user/User_MasajidCon";
import User_Completions from "./Pages/user/User_Completions";
import User_Trips from "./Pages/user/User_Trips";
import User_Social from "./Pages/user/User_Social";
import User_Onlinepro from "./Pages/user/User_Onlinepro";
import User_Schools from "./Pages/user/User_Schools";
import User_Annual from "./Pages/user/User_Annual";
import User_Iniatiatives from "./Pages/user/User_Iniatiatives";
import User_Futurepro from "./Pages/user/User_Futurepro";
import User_Contributions from "./Pages/user/User_Contributions";
import User_Complaints from "./Pages/user/User_Complaints";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Admin / User / Branches Routes */}
          <Route path="/dashboard" element={<User_Dashboard />} />
          {/* Super Admin Routes */}
          <Route path="/superdashboard" element={<Superdashboard />} />
          <Route path="/allbranches" element={<AllBranches />} />
          <Route path="/adminsuggestions" element={<Ssuggestions />} />
          <Route path="/singlebranch/:userId" element={<SsingleBranch />} />
          <Route path="/admincomplaints" element={<Scomplaints />} />
          {/* Super Admin Routes */}

          <Route path="/userprofile" element={<Branch_Profile />} />
          <Route path="/makatibs" element={<User_Makatibs />} />
          <Route path="/masajid" element={<User_Masajid />} />
          <Route path="/gallery" element={<User_Gallery />} />
          <Route path="/jalsajulus" element={<User_Jalsa />} />
          <Route path="/darululoom" element={<User_Darululoom />} />
          <Route path="/library" element={<User_Library />} />
          <Route path="/ulamahuffaz" element={<User_Ulama />} />
          <Route path="/meetings" element={<User_Meetings />} />
          <Route path="/womenchildren" element={<User_Women />} />
          <Route path="/masjidconstruction" element={<User_MasajidCon />} />
          <Route path="/competions" element={<User_Completions />} />
          <Route path="/tripsandtours" element={<User_Trips />} />
          <Route path="/socialmedia" element={<User_Social />} />
          <Route path="/onlineprograms" element={<User_Onlinepro />} />
          <Route path="/schoolscolleges" element={<User_Schools />} />
          <Route path="/annualreport" element={<User_Annual />} />
          <Route path="/otheriniatiatives" element={<User_Iniatiatives />} />
          <Route path="/futureprojects" element={<User_Futurepro />} />
          <Route path="/markazcontributions" element={<User_Contributions />} />
          <Route path="/usersuggestions" element={<User_Suggestions />} />
          <Route path="/complaints" element={<User_Complaints />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
