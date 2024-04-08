import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation

const UserSidebar = () => {
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
    <div className="bg-white sidebar p-2 ">
      <div className="m-2">
        <i className="bi bi-bootstrap-fill me-3 fs-4"></i>
        <span className="brand-name fs-4">{userName}</span>
      </div>
      <hr className="text-dark" />
      <div className="list-group list-group-flush">
        <Link to="/dashboard" className="list-group-item py-2 my-1">
          <i className="bi bi-speedometer2 fs-5 me-3"></i>
          <span className="fs-5">Dashboard</span>
        </Link>
        <Link to="/userprofile" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Branch Profile</span>
        </Link>
        <Link to="/makatibs" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Makatibs</span>
        </Link>
        <Link to="/masajid" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Masajids</span>
        </Link>
        {/* <Link to="/gallery" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Gallery</span>
        </Link> */}
        <Link to="/jalsajulus" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Jalsa & Julus</span>
        </Link>
        <Link to="/darululoom" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Darul-ulooms</span>
        </Link>
        <Link to="/library" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Library Details</span>
        </Link>
        <Link to="/ulamahuffaz" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Ulama & Huffaz Team</span>
        </Link>
        <Link to="/meetings" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Meetings Conducted</span>
        </Link>
        <Link to="/womenchildren" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Women & Children Department</span>
        </Link>
        <Link to="/masjidconstruction" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Masajid Constructions</span>
        </Link>
        {/* {yaa se} */}
        <Link to="/competions" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Competions Organised</span>
        </Link>
        <Link to="/tripsandtours" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Trips & Tours Planned</span>
        </Link>
        <Link to="/socialmedia" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Social Media & IT Activities</span>
        </Link>
        <Link to="/onlineprograms" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Online Programs</span>
        </Link>
        <Link to="/schoolscolleges" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Schools/Colleges</span>
        </Link>
        <Link to="/annualreport" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Annual Report</span>
        </Link>
        <Link to="/otheriniatiatives" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Other Iniatiatives</span>
        </Link>
        <Link to="/futureprojects" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Future Projects</span>
        </Link>
        <Link to="/markazcontributions" className="list-group-item py-2 my-1">
          <i className="fa fa-code-branch fs-5 me-3"></i>
          <span className="fs-5">Contributions to Markaz</span>
        </Link>
        <Link to="/usersuggestions" className="list-group-item py-2 my-1">
          <i className="bi bi-table fs-5 me-3"></i>
          <span className="fs-5">Suggestions</span>
        </Link>
        <Link to="/complaints" className="list-group-item py-2 my-1">
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

export default UserSidebar;
