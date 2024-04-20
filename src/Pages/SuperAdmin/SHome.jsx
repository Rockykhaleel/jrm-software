import { useEffect, useState } from "react";
import Navigation from "../../Components/admin/Navigation";
import BASE_URL from "../../../apiConfig";

// eslint-disable-next-line react/prop-types
const SHome = ({ Toggle }) => {
  // eslint-disable-next-line no-unused-vars
  const [Expences, setExpences] = useState(0);
  const [Funds, setFunds] = useState(0);
  const [numberOfBranches, setnumberOfBranches] = useState(0);
  const [adminDashboardmakatibs, setadminDashboardmakatibs] = useState(0);
  const [adminDashboardmasajids, setadminDashboardmasajids] = useState(0);
  const [adminDashboardstudentsstudying, setadminDashboardstudentsstudying] =
    useState(0);
  useEffect(() => {
    adminDashboard();
    adminDashboardBranches();
    adminDashboardmakatibss();
    adminDashboardmasajidss();
    adminDashboardstudentsstudyings();
  }, []);

  const adminDashboard = async () => {
    const url = `${BASE_URL}admin/adminDashboard`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Set both expenses and funds separately
      setExpences(data.formattedTotalExpenses);
      setFunds(data.formattedTotalFunds);
    } catch (error) {
      console.log(error);
    }
  };

  const adminDashboardBranches = async () => {
    const url = `${BASE_URL}admin/adminDashboardBranches`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Set both expenses and funds separately
      setnumberOfBranches(data.numberOfBranches);
    } catch (error) {
      console.log(error);
    }
  };

  const adminDashboardmakatibss = async () => {
    const url = `${BASE_URL}admin/adminDashboardmakatibs`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Set both expenses and funds separately
      setadminDashboardmakatibs(data.numberOfmakatibs);
    } catch (error) {
      console.log(error);
    }
  };
  const adminDashboardmasajidss = async () => {
    const url = `${BASE_URL}admin/adminDashboardmasajids`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Set both expenses and funds separately
      setadminDashboardmasajids(data.numberOfMasajid);
    } catch (error) {
      console.log(error);
    }
  };

  const adminDashboardstudentsstudyings = async () => {
    const url = `${BASE_URL}admin/adminDashboardstudentsstudying`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Set both expenses and funds separately
      setadminDashboardstudentsstudying(data.totalStudents);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-3">
      <Navigation Toggle={Toggle} />
      <div className="container-fluid">
        {/* <div className="row bg-white">
          <h3 className="text-center text-dark">JRM</h3>
        </div> */}
        <div className="row g-3 my-2">
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{numberOfBranches}</h3>
                <p className="fs-5">Total Branches Registered</p>
              </div>
              <i className="fa-solid fa-registered p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{adminDashboardstudentsstudying}</h3>
                <p className="fs-5">Total Students Studying</p>
              </div>
              <i className="fa-solid fa-graduation-cap p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{adminDashboardmakatibs}</h3>
                <p className="fs-5">Total Makatibs</p>
              </div>
              <i className="fa-solid fa-place-of-worship p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{adminDashboardmasajids}</h3>
                <p className="fs-5">Total Masajids</p>
              </div>
              <i className="fa-solid fa-mosque p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{Funds}</h3>
                <p className="fs-5">Total Funds Raised</p>
              </div>
              <i className="fa-solid fa-indian-rupee-sign p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">{Expences}</h3>
                <p className="fs-5">Total Expenses</p>
              </div>
              <i className="fa-solid fa-wallet p-3 fs-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SHome;
