import { useState } from "react";
import UserSidebar from "../../Components/user/UserSidebar";
import Completions from "./Completions";

const User_Completions = () => {
  const [toggle, setToggle] = useState(false);
  const Toggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="container-fluid bg-secondary min-vh-100">
      <div className="row">
        {toggle && (
          <div className="col-2 bg-white vh-100 position-fixed overflow-scroll">
            <UserSidebar />
          </div>
        )}
        {toggle && <div className="col-2"></div>}
        <div className="col">
          <Completions Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
};

export default User_Completions;
