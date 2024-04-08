import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation

const Sidebar = () => {
  const history = useNavigate(); // Initialize useNavigate

  const [userName, setUserName] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userobjj = localStorage.getItem("user");
    const uss = JSON.parse(userobjj);
    if (!token) {
      window.location.href = "/login";
    }
    setUserName(uss.name);
    // console.log(uss.name);
  }, []);

  // Function to log out the user
  const doUserLogOut = () => {
    // Clear any session data from local storage
    localStorage.clear(); // Remove any other relevant data as well
    // Redirect to the login page
    history("/login"); // Use useNavigate to navigate
  };

  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">{userName}</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <Link to="/superdashboard" className="list-group-item py-2 my-1">
          <i className="bi bi-speedometer2 fs-5 me-3"></i>
          <span className="fs-5">Dashboard</span>
        </Link>
        <Link to="/allbranches" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">All Branches</span>
        </Link>
        <Link to="/adminsuggestions" className="list-group-item py-2 my-1">
          <i className="bi bi-table fs-5 me-3"></i>
          <span className="fs-5">Suggestions</span>
        </Link>
        <Link to="/admincomplaints" className="list-group-item py-2 my-1">
          <i className="bi bi-clipboard-data fs-5 me-3"></i>
          <span className="fs-5">Complaints</span>
        </Link>
        <button onClick={doUserLogOut} className="list-group-item py-2 my-1">
          <i className="bi bi-power fs-5 me-3"></i>
          <span className="fs-5">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
