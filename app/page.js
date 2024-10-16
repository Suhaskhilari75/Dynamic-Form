"use client";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
export default function Home() {
  const [divs, setdivs] = useState([]);
  const handleClick = () => {
    setdivs([...divs, { id: divs.length + 1 }]);
  };

  const handleDelete = (id) => {
    setdivs(divs.filter((div)=>(
      div.id!==id
    )))
  };

  return (
    <>
      <div className=" flex justify-center content-center align-middle">
        <div>
          <h1 className="text-3xl font-bold text-center">
            Creating Dynamic Form{" "}
          </h1>
          <form action="submit" className="flex flex-col">
            <div className="flex gap-2 m-2">
              <label className="font-semibold">Name: </label>
              <input
                type="text"
                className=" bg-transparent"
                placeholder="Enter your name"
              ></input>
            </div>
            <div className=" flex gap-2 m-2">
              <label className="font-semibold">Email :</label>
              <input
                className=" bg-transparent"
                type="email"
                placeholder="Enter your email"
              ></input>
            </div>
            <div className="m-2">
              <label className="font-semibold">Password :</label>
              <input
                className=" bg-transparent"
                placeholder="Enter your password"
                type="password"
              ></input>
            </div>
            <div className="m-2">
              <label className="font-semibold">Gender :</label>
              <select className=" bg-transparent">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <button
              className="bg-green-500 rounded-md p-2 m-2 hover:bg-green-400"
              type="submit"
            >
              Submit
            </button>
          </form>
          <button
            className="bg-green-500 rounded-md p-2 m-2 hover:bg-green-400"
            id="inputbutton"
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
                className=" bg-transparent"
                placeholder={`Enter input ${div.id}`}
                type="text"
              ></input>
              <div className="" onClick={() => handleDelete(div.id)}>
                <ImCancelCircle className="text-red-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
