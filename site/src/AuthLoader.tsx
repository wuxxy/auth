import React, { ReactNode, useState } from "react";
import Authxios from "./Authxios";
import UserContext from "./context";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const AuthLoader = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState(-1);
  const { setUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  React.useEffect(() => {
    Authxios.get("/api/@me")
      .then((e) => {
        setUser(e.data);
        setAuth(1);
      })
      .catch(() => {
        setAuth(0);
        navigate("/login");
      });
  }, []);
  return (
    <>
      {auth === 1 ? (
        children
      ) : auth === -1 ? (
        <ReactLoading color="#794c75" />
      ) : (
        <span>Redirecting...</span>
      )}
    </>
  );
};

export default AuthLoader;
