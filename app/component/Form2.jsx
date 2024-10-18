"use client";
import React from "react";
import { ImCancelCircle } from "react-icons/im";
import { useState, useRef } from "react";
import { ImEye, ImEyeBlocked } from "react-icons/im"; // Import eye icons for show/hide password
import { RxCross2 } from "react-icons/rx";
import { FaChevronDown } from "react-icons/fa6";

const Form2 = () => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    confPass: "",
    gender: "",
  });
  const [errors, SetErrors] = useState({
    name: "",
    email: "",
    password: "",
    confPass: "",
    gender: "",
  });
  const [divs, setdivs] = useState([]);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [fieldshow, setfieldshow] = useState(true);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confPassRef = useRef(null);
  const genderRef = useRef(null);

  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) {
          error = "Name is required*";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required*";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Email is invalid";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required*";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters long";
        }
        break;
      case "confirmPass":
        if (!value) {
          error = "Confirm password is required*";
        } else if (value !== formData.password) {
          error = "Password does not match !!";
        }
        break;
      case "gender":
        if (!value) {
          error = "Gender is required*";
        }
        break;
    }
    return error;
  };
  //checking change  for all fields
  const handlechange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
    SetErrors({
      ...errors,
      [name]: validate(name, value),
    });
    setisSubmitted(false);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    //validate all fields
    const nameError = validate("name", formData.name);
    const emailError = validate("email", formData.email);
    const passwordError = validate("password", formData.password);
    const ConfirmPassError = validate("confirmPass", formData.confPass);
    const genderError = validate("gender", formData.gender);
    SetErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confPass: ConfirmPassError,
      gender: genderError,
    });
    

    //FOCUS cursor will go to the error occur field on uh can easily find error field
    if (nameError) {
      nameRef.current.focus(); // Focus on the name field if there's an error
    } else if (emailError) {
      emailRef.current.focus(); // Focus on the email field if there's an error
    } else if (passwordError) {
      passwordRef.current.focus(); // Focus on the password field if there's an error
    } else if (ConfirmPassError) {
      confPassRef.current.focus(); // Focus on the confirm password field if there's an error
    } else if (genderError) {
      genderRef.current.focus(); // Focus on the gender field if there's an error
    } else {
      setisSubmitted(true); // No errors, form is valid
    }
  };
  const handleAddFiedld = (e) => {
    e.preventDefault();
    setdivs([
      ...divs,
      {
        id: divs.length + 1,
      },
    ]);
  };
  const handleDelete = (id) => {
    setdivs(divs.filter((div) => div.id !== id));
  };
  return (
    <>
      <div className=" flex justify-center min-h-screen items-center">
        <div>
          {isSubmitted && (
            <div className="text-green-500">Form Submitted Successfully</div>
          )}
          <h1 className="text-3xl font-bold text-center mb-4">
            Creating Dynamic Form{" "}
          </h1>
          <form onSubmit={handlesubmit} className="flex flex-col">
            <div className="flex gap-2 m-2">
              <label for="fname" className="font-semibold">
                Name*:{" "}
              </label>
              <input
                ref={nameRef}
                className={
                errors.name ? "cust-border bg-transparent" : "bg-transparent"
                }
                value={formData.name}
                type="text"
                id="fname"
                name="name"
                placeholder="Enter your name"
                onChange={(e) => handlechange(e)}
              />
            </div>
            {errors.name && (
              <span className="text-red-500 m-2">{errors.name}</span>
            )}
            <div className=" flex gap-2 m-2">
              <label for="email" className="font-semibold">
                Email* :
              </label>
              <input
                ref={emailRef}
                id="email"
                name="email"
                value={formData.email}
                className={
                  errors.name ? "cust-border bg-transparent" : "bg-transparent"
                }
                placeholder="Enter your email"
                onChange={(e) => handlechange(e)}
              />
            </div>
            {errors.email && <p className="text-red-500 m-2">{errors.email}</p>}

            <div className="m-2 flex">
              <label for="password" className="font-semibold">
                Password* :
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  name="password"
                  onChange={(e) => handlechange(e)}
                  id="password"
                  value={formData.password}
                  className={
                    errors.name
                      ? "cust-border bg-transparent"
                      : "bg-transparent"
                  }
                  placeholder="Enter  password"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  type="button"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <ImEye className="text-gray-500" />
                  ) : (
                    <ImEyeBlocked className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500 m-2">{errors.password}</span>
            )}

            <div className="m-2 flex">
              <label for="confirm-password" className="font-semibold">
                Confirm Password* :
              </label>
              <div className="relative">
                <input
                  ref={confPassRef}
                  name="confPass"
                  value={formData.confPass}
                  onChange={(e) => handlechange(e)}
                  className={
                    errors.name
                      ? "cust-border bg-transparent"
                      : "bg-transparent"
                  }
                  placeholder="Confirm password"
                  type={showPassword2 ? "text" : "password"}
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? (
                    <ImEye className="text-gray-500" />
                  ) : (
                    <ImEyeBlocked className="text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            {errors.confPass && (
              <span className="text-red-500 m-2">{errors.confPass}</span>
            )}
            <div className="m-2">
              <label for="gender" className="font-semibold">
                Gender* :
              </label>
              <select
                ref={genderRef}
                name="gender"
                value={formData.gender}
                id="gender"
                className={
                  errors.gender
                    ? "cust-border bg-transparent"
                    : "bg-transparent"
                }
                onChange={(e) => handlechange(e)}
              >
                {" "}
                <option value="" disabled>
                  Select your gender
                </option>
                <option>Male</option>
                <option>Female</option>
                <option>transgender</option>
              </select>
            </div>
            {errors.gender && (
              <span className="text-red-500 m-2">{errors.gender}</span>
            )}
            <button
              className="bg-gray-300 rounded-md p-2 m-2 hover:bg-gray-400"
              type="button"
              onClick={handleAddFiedld}
            >
              Add Input{" "}
            </button>
            <div
              onClick={() => {
                setfieldshow(!fieldshow);
              }}
              className="relative flex bg-gray-300  hover:bg-gray-400 rounded-md p-2 m-2"
            >
              <button type="button" className="">
                {fieldshow ? `Hide` : "Show"}
              </button>
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {fieldshow ? <RxCross2 /> : <FaChevronDown />}
              </button>
            </div>

            {fieldshow &&
              divs.map((div) => (
                <div
                  key={div.id}
                  className="m-2 flex justify-around content-center"
                >
                  <label className="font-semibold" htmlFor={`input-${div.id}`}>
                    Input-{div.id} :{" "}
                  </label>
                  <input
                    id={`input-${div.id}`}
                    className="bg-transparent"
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

export default Form2;
