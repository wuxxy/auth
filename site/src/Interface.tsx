import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import AuthLoader from "./AuthLoader";
import Authxios from "./Authxios";
import xios from "./xios";
import UserContext from "./context";
interface Integrations {
  id: string;
  name: string;
  redirect: string;
  link: string;
}

const Interface = () => {
  const [integrations, setIntegrations] = useState([] as Integrations[]);
  const { user, setUser, ...context } = React.useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    xios.get("/integrations").then((e) => {
      setIntegrations(e.data);
    });
  }, []);
  const ConnectIntegration = (id: string) => {
    let s = integrations.find((e: any) => e.id === id)?.redirect || "";
    if (s) {
      window.open(s);
    }
    Authxios.post("/api/connect", { int: id }).then((e) => {
      setUser((b: any) => ({ ...b, integrations: e.data }));
    });
  };
  const DisconnectIntegration = (id: string) => {
    Authxios.post("/api/disconnect", { int: id }).then((e) => {
      setUser((b: any) => ({ ...b, integrations: e.data }));
    });
  };
  return (
    <div className="text-gray-200 flex flex-col w-full h-full items-center justify-center">
      <div className="flex flex-row ring-[#cd9dba] ring-1 w-full">
        <div className="p-2 flex-1 text-center">Integrations</div>
        <div className="p-2 flex-1 text-center">Account</div>
        <div className="p-2 flex-1 text-center">Logout</div>
      </div>
      <AuthLoader>
        <div className="flex flex-col flex-wrap flex-1 w-full p-4 gap-2">
          <span className="font-bold text-sm">
            Some integrations may require you to leave the site
          </span>
          {/* "#794c75" */}
          {integrations.map((integ: any) => (
            <div
              key={integ.id}
              className="bg-[#794c75] rounded-sm p-4 flex flex-row items-center"
            >
              <div className="flex-1">
                <h4>{integ.name}</h4>
              </div>
              <div>
                {user.integrations.map((e) => e.id).includes(integ.id) ? (
                  <button
                    onClick={() => DisconnectIntegration(integ.id)}
                    className="bg-[#4c2661] p-2"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => ConnectIntegration(integ.id)}
                    className="bg-violet-500 p-2"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="ring-1 ring-pink-300 rounded-sm p-4">
            <div>create your own (coming soon)</div>
          </div>
        </div>
        <div
          className="flex flex-col bg-gray-700 text-gray-400 text-xs font-semibold w-full"
          data-debug
        >
          <span>logged in as {user.username}</span>
          <span className="text-gray-300">unfinished UI</span>
        </div>
      </AuthLoader>
    </div>
  );
};

export default Interface;
