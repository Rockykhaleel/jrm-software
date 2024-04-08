import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation

// eslint-disable-next-line react/prop-types
const UserNavigation = ({ Toggle }) => {
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
  const history = useNavigate(); // Initialize useNavigate

  // Function to log out the user
  const doUserLogOut = () => {
    // Clear any session data from local storage
    localStorage.clear(); // Remove any other relevant data as well
    // Redirect to the login page
    history("/login"); // Use useNavigate to navigate
  };
  return (
    <nav className="navbar navbar-expand-sm navbar-white bg-white px-5">
      <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
      <span className="text-center fs-6 fw-semibold">Jamat Raza E Mustafa</span>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>

      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 me-4 mt-lg-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {userName}
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownId">
              <a className="dropdown-item" href="/userprofile">
                Profile
              </a>
              <a className="dropdown-item" href="#" onClick={doUserLogOut}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNavigation;
