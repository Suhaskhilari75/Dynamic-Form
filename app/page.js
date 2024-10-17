"use client";
import { useEffect, useRef } from "react";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
export default function Home() {
  // const buttonRef=useRef(null);
  const [email, SetEmail] = useState("");
  const [error, SetError] = useState("");
  const [divs, setdivs] = useState([]);
  const [password, Setpassword] = useState("");
  const [errormessages, SetErrorMessages] = useState([]);
  const [confPass, SetconfPass] = useState("");
  const [fname, setFname] = useState("");

  // useEffect(()=>{
  //   const button=buttonRef.current;
  //   button.addEventListener("click", handleClick)
  // })

  const validate = (value) => {
    let message = [];
    if (value.length < 8) {
      message.push("Password must be at least 8 Characters Long");
    }
    if (!/[A-Z]/.test(value)) {
      message.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(value)) {
      message.push("Password must contain at least one lowercase letter.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      message.push(
        "Password must contain at least one special character (e.g., !@#$%^&*)."
      );
    }
    Setpassword(value);
    SetErrorMessages(message);
  };

  //checking confirm password
  const handleConfPass = (value) => {
    if (value !== password) {
      SetconfPass("Passwords do not match.");
    } else {
      SetconfPass("");
    }
  };

  //to add inputs
  const handleClick = (e) => {
    e.preventDefault();
    setdivs([...divs, { id: divs.length + 1 }]);
  };
  // to delete inputs
  const handleDelete = (id) => {
    setdivs(divs.filter((div) => div.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log("value", name, value);
  };

  const handleEmailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      SetError("Please Enter a valid email address !!");
    } else {
      SetError("");
    }
    SetEmail(e.target.value);
  };
  const handlersubmit = (e) => {
    
    if (password.length < 0) {
    }
  }
    return (
      <>
        <div className=" flex justify-center min-h-screen items-center">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4">
              Creating Dynamic Form{" "}
            </h1>
            <form onSubmit={handlersubmit} className="flex flex-col">
              <div className="flex gap-2 m-2">
                <label for="name" className="font-semibold">
                  Name:{" "}
                </label>
                <input
                  value={fname}
                  required
                  type="text"
                  id="name"
                  name="fname"
                  className=" bg-transparent"
                  placeholder="Enter your name"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className=" flex gap-2 m-2">
                <label for="email" className="font-semibold">
                  Email :
                </label>
                <input
                  required
                  id="email"
                  value={email}
                  className=" bg-transparent"
                  placeholder="Enter your email"
                  onChange={handleEmailChange}
                />
              </div>
              {error && <p className="text-red-500 m-2">{error}</p>}

              <div className="m-2">
                <label for="password" className="font-semibold">
                  Password :
                </label>
                <input
                  onChange={(e) => validate(e.target.value)}
                  id="password"
                  className=" bg-transparent"
                  placeholder="Enter your password"
                  type="password"
                />
              </div>
              {errormessages.length > 0 && (
                <div className="m-2 text-red-500">
                  {errormessages.map((message, index) => (
                    <p key={index}>{message}</p>
                  ))}
                </div>
              )}
              <div className="m-2">
                <label for="confirm-password" className="font-semibold">
                  Confirm Password :
                </label>
                <input
                  onChange={(e) => handleConfPass(e.target.value)}
                  id="confirm-password"
                  className=" bg-transparent"
                  placeholder="Confirm password"
                  type="password"
                />
                {confPass.length > 0 && (
                  <div className="m-2 text-red-500">
                    <p>{confPass}</p>
                  </div>
                )}
              </div>
              <div className="m-2">
                <label for="gender" className="font-semibold">
                  Gender :
                </label>
                <select id="gender" className=" bg-transparent">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <button
                //  id="addButton"
                //  ref={buttonRef}
                className="bg-gray-300 rounded-md p-2 m-2 hover:bg-gray-400"
                onClick={handleClick}
                type="button"
              >
                Add Input{" "}
              </button>
              {divs.map((div) => (
                <div
                  key={div.id}
                  className="m-2 flex justify-around content-center"
                >
                  <label className="font-semibold" htmlFor={`input-${div.id}`}>
                    Input-{div.id} :{" "}
                  </label>
                  <input
                    id={`input-${div.id}`}
                    required
                    className=" bg-transparent"
                    placeholder={`Enter input ${div.id}`}
                    type="text"
                  />
                  <div className="" onClick={() => handleDelete(div.id)}>
                    <ImCancelCircle className="text-red-600" />
                  </div>
                </div>
              ))}
              <button
                className="bg-green-500 rounded-md p-2 m-2 hover:bg-green-400"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  };