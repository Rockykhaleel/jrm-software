import { useState } from "react";
import Annual from "./Annual";
import UserSidebar from "../../Components/user/UserSidebar";

const User_Annual = () => {
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
          <Annual Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
};

export default User_Annual;
