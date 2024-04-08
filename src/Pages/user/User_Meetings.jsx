import { useState } from "react";
import UserSidebar from "../../Components/user/UserSidebar";
import Meetings from "./Meetings";

const User_Meetings = () => {
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
          <Meetings Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
};

export default User_Meetings;
