import { useState } from "react";
import Sidebar from "../../Components/admin/Sidebar";
import Suggestions from "./Suggestions";

const Ssuggestions = () => {
  const [toggle, setToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}
        {toggle && <div className="col-2"></div>}
        <div className="col">
          <Suggestions Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
};

export default Ssuggestions;
