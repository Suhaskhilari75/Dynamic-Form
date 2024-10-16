"use client";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
export default function Home() {
  const [email, SetEmail] = useState("");
  const [error, SetError] = useState("");
  const [divs, setdivs] = useState([]);
  //to add inputs
  const handleClick = (e) => {
    e.preventDefault();
    setdivs([...divs, { id: divs.length + 1 }]);
  };
  // to delete inputs
  const handleDelete = (id) => {
    setdivs(divs.filter((div) => div.id !== id));
  };

  const handleEmailChange = (e) => {
    SetEmail(e.target.value);
    if (error) {
      SetError("");
    }
  };
  const handlersubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      SetError("Please Enter a valid email address !!");
    } else {
      SetError("");
    }
  };
  const handleNewInput = () => {};
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
                required
                type="text"
                id="name"
                className=" bg-transparent"
                placeholder="Enter your name"
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
                id="password"
                className=" bg-transparent"
                placeholder="Enter your password"
                type="password"
              />
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
              className="bg-gray-300 rounded-md p-2 m-2 hover:bg-gray-400"
              onClick={handleClick}
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
                  onChange={handleNewInput}
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
}
