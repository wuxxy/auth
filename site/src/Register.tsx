import axios from "axios";
import React from "react";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import jokes from "./RegisterJokes.json";
import xios from "./xios";
const joke = jokes[Math.floor(Math.random() * jokes.length)];
const Register = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();
  function Register(event: any) {
    event.preventDefault();
    setLoading(true);
    xios
      .post("/auth/register", {
        email,
        username,
        password,
      })
      .then((e) => {
        setLoading(false);
        navigate("/login");

        console.log(e.data);
      })
      .catch((e) => {
        setLoading(false);
      });
  }
  return (
    <div className="flex flex-row h-full w-full">
      <div className="tips">
        <span>{joke}</span>
      </div>
      <div className="flex h-full flex-wrap items-center justify-center flex-col text-neutral-800 dark:text-neutral-200 py-4 content">
        <div className="text-center">
          <h2 className="font-bold text-xl">Welcome Aboard</h2>
          <h4 className="text-sm text-gray-400">
            Explore, connect, and unlock.
          </h4>
        </div>
        <div className="w-full">
          <form className="flex flex-col gap-4 justify-center items-center w-full py-4">
            <div className="w-2/3">
              <span className="uppercase text-sm text-gray-300 font-semibold">
                Username
              </span>
              <input
                className="p-2 bg-transparent border-b-2 w-full border-[#794c75] bg-[#271a2e] focus:outline-none focus:border-[#b676b0]"
                placeholder="what should your username be"
                type="text"
                value={username}
                onInput={(e: any) => setUsername(e.target.value)}
              ></input>
            </div>
            <div className="w-2/3">
              <div className="uppercase text-sm text-gray-300 font-semibold">
                Email
              </div>
              <input
                className="p-2 bg-transparent border-b-2 w-full border-[#794c75] bg-[#271a2e] focus:outline-none focus:border-[#b676b0]"
                placeholder="what's your email"
                type="email"
                value={email}
                onInput={(e: any) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="w-2/3">
              <div className="uppercase text-sm text-gray-300 font-semibold">
                Password
              </div>
              <input
                className="p-2 bg-transparent border-b-2 w-full border-[#794c75] focus:outline-none bg-[#271a2e] focus:border-[#b676b0]"
                placeholder="make a secure and strong password"
                value={password}
                onInput={(e: any) => setPassword(e.target.value)}
                type="password"
              ></input>
            </div>
            <div className="w-2/3 gap-2 flex-col flex">
              <button
                disabled={loading}
                onClick={!loading ? Register : undefined}
                className="w-full p-2 h-[64px] ring-1 ring-[#cd9dba] flex flex-row items-center justify-center"
              >
                {loading ? (
                  <ReactLoading type={"bubbles"} color={"#794c75"} />
                ) : (
                  "Register"
                )}
              </button>
              <span className="text-xs text-gray-300">
                If you're already registed, click{" "}
                <a className="underline hover:text-gray-500" href="/login">
                  here
                </a>{" "}
                to log in.
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
