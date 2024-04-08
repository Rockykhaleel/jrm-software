import {} from "react";
import Navigation from "../../Components/admin/Navigation";

// eslint-disable-next-line react/prop-types
const Suggestions = ({ Toggle }) => {
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
                <p className="fs-5">Suggestions</p>
              </div>
              <i className="fa-solid fa-registered p-3 fs-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
