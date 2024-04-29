import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import logo from "../assets/logo-new-JRM-2685501165.png";
import "./Login.css";
import Swal from "sweetalert2";
import BASE_URL from "../../apiConfig";

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isName, setIsName] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isAddress, setIsAddress] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isPass, setIsPass] = useState("");
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isName === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Name",
      });
    } else if (isPhone === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Phone",
      });
    } else if (isAddress === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Phone",
      });
    } else if (isEmail === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Email",
      });
    } else if (isPass === "") {
      Swal.fire({
        icon: "warning",
        title: "Please enter Password",
      });
    } else {
      const response = await fetch(BASE_URL + "user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameRef.current.value,
          address: addressRef.current.value,
          phone: phoneRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      // const data = await response.json();
      // console.log(data);
      console.log("response", response);
      if (response.status === 201) {
        // Set isRegistered to true upon successful registration
        setIsRegistered(true);
        Swal.fire({
          icon: "success",
          title: "Registered in successfully!",
        });
      } else {
        // Handle registration error
        //console.error(data);
        Swal.fire({
          icon: "error",
          title: "Username or password is incorrect",
        });
      }
    }
  };

  if (isRegistered) {
    // Redirect to login page if registration was successful
    return <Navigate to="/login" />;
  }

  return (
    <div className="main">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="container">
            <img src={logo} id="image" alt="" />
            <form className="form" onSubmit={handleSignUp}>
              <div className="mb-3 ">
                <label className="form-label">Enter Name</label>
                <input
                  type="name"
                  className="form-control"
                  id="name"
                  ref={nameRef}
                  onChange={(e) => setIsName(e.target.value)}
                  placeholder="enter name"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  ref={emailRef}
                  onChange={(e) => setIsEmail(e.target.value)}
                  placeholder="enter email"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  ref={passwordRef}
                  onChange={(e) => setIsPass(e.target.value)}
                  placeholder="password"
                />
              </div>
              <div className="mb-3 ">
                <label className="form-label">Enter Phone Number</label>
                <input
                  type="phone"
                  className="form-control"
                  id="exampleInputphone"
                  ref={phoneRef}
                  onChange={(e) => setIsPhone(e.target.value)}
                  placeholder="enter number"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                  type="address"
                  className="form-control"
                  id="exampleInputaddress"
                  ref={addressRef}
                  onChange={(e) => setIsAddress(e.target.value)}
                  placeholder="enter address"
                />
              </div>
              <button id="buttoned" type="submit" className="btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
