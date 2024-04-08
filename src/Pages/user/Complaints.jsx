import {} from "react";
import UserNavigation from "../../Components/user/UserNavigation";

// eslint-disable-next-line react/prop-types
const Complaints = ({ Toggle }) => {
  return (
    <div className="px-3">
      <UserNavigation Toggle={Toggle} />
      <div className="container-fluid">
        {/* <div className="row bg-white">
          <h3 className="text-center text-dark">JRM</h3>
        </div> */}
        <div className="row g-3 my-2">
          <div className="col-md-4">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div>
                <h3 className="fs-2">Complaints</h3>
              </div>
              <i className="fa-solid fa-registered p-3 fs-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
