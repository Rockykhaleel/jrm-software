import {} from "react";
import Navigation from "../../Components/admin/Navigation";

// eslint-disable-next-line react/prop-types
const SHome = ({ Toggle }) => {
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
                <h3 className="fs-2">230</h3>
                <p className="fs-5">Total Branches Registered</p>
              </div>
              <i className="fa-solid fa-registered p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">2450</h3>
                <p className="fs-5">Total Students Studying</p>
              </div>
              <i className="fa-solid fa-graduation-cap p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">2250</h3>
                <p className="fs-5">Total Makatibs</p>
              </div>
              <i className="fa-solid fa-place-of-worship p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">202</h3>
                <p className="fs-5">Total Masajids</p>
              </div>
              <i className="fa-solid fa-mosque p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">20000</h3>
                <p className="fs-5">Total Funds Raised</p>
              </div>
              <i className="fa-solid fa-indian-rupee-sign p-3 fs-1"></i>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">15000</h3>
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
