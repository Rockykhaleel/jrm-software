import { useEffect, useState, useRef } from "react";
import UserNavigation from "../../Components/user/UserNavigation";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import BASE_URL from "../../../apiConfig";

// eslint-disable-next-line react/prop-types
const BranchProfile = ({ Toggle }) => {
  const [object, setObject] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [id, setID] = useState("");
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const memberRef = useRef();
  const designationRef = useRef();
  const accountRef = useRef();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const parsed = JSON.parse(user);
    setID(parsed.id);
    // console.log(parsed.id);
    const token = localStorage.getItem("token");
    // let dataBack = "";
    const fetchData = async () => {
      // const user = JSON.parse(localStorage.getItem("user"));
      // console.log("Hello from frontend user -> ", user);

      const response = await fetch(`${BASE_URL}user/userByID/${parsed.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response);
      // console.log(response.status);
      // console.log("Hello from backend");
      // dataBack = response;
      const data = await response.json();
      // console.log(data.data);
      setObject(data.data);
      // console.log("data from database-->> ", dataBack);
    };
    fetchData();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const obb = {
      name: nameRef.current.value,
      address: addressRef.current.value,
      phone: phoneRef.current.value,
      memberscount: memberRef.current.value,
      designation: designationRef.current.value,
      account: accountRef.current.value,
    };
    console.log(obb);
    if (nameRef.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Name",
      });
    } else if (phoneRef.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Phone",
      });
    } else if (addressRef.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Address",
      });
    } else if (memberRef.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Members",
      });
    } else if (designationRef.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Designations",
      });
    } else if (accountRef.current.value === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Account Details",
      });
    } else {
      const response = await fetch(BASE_URL + "user/updateUser/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(obb),
      });

      // const data = await response.json();
      // console.log(data);
      if (response.status === 200) {
        // Set isRegistered to true upon successful registration
        setIsSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Changed Profile successfully!",
        });
      }
      // else {
      //   // Handle registration error
      //   //console.error(data);
      //   Swal.fire({
      //     icon: "error",
      //     title: "Username or password is incorrect",
      //   });
      // }
    }
  };

  if (isSuccess) {
    // Redirect to login page if registration was successful
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="px-3">
      <UserNavigation Toggle={Toggle} />
      <div className="container-fluid">
        <div className="row bg-white g-3 my-2 pt-1 pb-2 mt-4 fw-bolder fs-2 rounded-3 shadow-sm">
          <h3 className="text-center text-dark">Branch Profile</h3>
        </div>
        <div className="row g-3 my-2">
          <div className="col">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div className="form-floating w-100">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  defaultValue={object.name || ""}
                  placeholder="Name"
                  ref={nameRef}
                  // onChange={(e) => setIsName(e.target.value)}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div className="form-floating w-100">
                <input
                  type="text"
                  className="form-control"
                  id="place"
                  defaultValue={object.address || ""}
                  placeholder="Place"
                  ref={addressRef}
                  // onChange={(e) => setIsAddress(e.target.value)}
                />
                <label htmlFor="floatingInput">Place</label>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div className="form-floating w-100">
                <input
                  type="number"
                  className="form-control"
                  id="number"
                  defaultValue={object.memberscount || ""}
                  placeholder="Number"
                  ref={memberRef}
                  // onChange={(e) => setIsMember(e.target.value)}
                />
                <label htmlFor="floatingInput">Number of Members</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-3 my-2">
          <div className="col">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div className="form-floating w-100">
                <input
                  type="text"
                  className="form-control"
                  id="designation"
                  defaultValue={object.designation || ""}
                  placeholder="Designation"
                  ref={designationRef}
                  // onChange={(e) => setIsDesign(e.target.value)}
                />
                <label htmlFor="floatingInput">Designation</label>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div className="form-floating w-100">
                <input
                  type="phone"
                  className="form-control"
                  id="phone"
                  defaultValue={object.phone || ""}
                  placeholder="Phone"
                  ref={phoneRef}
                  // onChange={(e) => setIsPhone(e.target.value)}
                />
                <label htmlFor="floatingInput">Phone Number</label>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
              <div className="form-floating w-100">
                <input
                  type="number"
                  className="form-control"
                  id="account"
                  defaultValue={object.account || ""}
                  placeholder="Account"
                  ref={accountRef}
                  // onChange={(e) => setIsAcc(e.target.value)}
                />
                <label htmlFor="floatingInput">Account Details</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-3 my-2">
          <div className="col">
            <button
              type="button"
              className="btn btn-success w-25 "
              onClick={handleSignUp}
            >
              Update <i className="bi bi-pencil-square"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchProfile;
