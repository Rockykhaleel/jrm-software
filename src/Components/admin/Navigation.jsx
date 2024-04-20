import { useEffect, useState } from "react";
import BASE_URL from "../../../apiConfig";
import { useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation
// import "bootstrap/js/dist/collapse";

// eslint-disable-next-line react/prop-types
const Navigation = ({ Toggle }) => {
  const [userName, setUserName] = useState("");
  const [userObj, setUserObj] = useState([]);
  const [activeSuggestionsCount, setActiveSuggestionsCount] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userobjj = localStorage.getItem("user");
    const uss = JSON.parse(userobjj);
    const user = localStorage.getItem("user");
    const parsed = JSON.parse(user);
    fetchData(parsed.id);
    if (!token) {
      window.location.href = "/login";
    }
    setUserName(uss.name);
    // console.log(uss.name);
  }, []);
  useEffect(() => {
    const count = userObj.filter((item) => item.isNewReplyUser).length;
    setActiveSuggestionsCount(count);
  }, [userObj]);
  const history = useNavigate(); // Initialize useNavigate

  // eslint-disable-next-line no-unused-vars
  const fetchData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}ask/getAllsuggestions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      // console.log(data.data);
      if (data.data) {
        setUserObj(data.data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
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
          <a href="/adminsuggestions">
            <button type="button" className="btn btn-primary position-relative">
              Inbox &nbsp;&nbsp;<i className="bi bi-chat-left-dots-fill"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {activeSuggestionsCount}
                <span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </a>
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
              <a className="dropdown-item" href="#">
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

export default Navigation;
