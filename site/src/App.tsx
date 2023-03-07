import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UserContext from "./context";
import Interface from "./Interface";
import Login from "./Login";
import Register from "./Register";
import { ContextType } from "./context";
import Cookies from "js-cookie";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="app" element={<Interface />} />
    </Route>
  )
);
function App() {
  const [user, setUser] = React.useState<any>({
    username: "",
    id: "",
    email: "",
    integrations: [],
    discriminator: [],
  } as unknown as ContextType);
  const context: ContextType = {
    user,
    setUser,
    token: localStorage.getItem("token") || "",
    refresh: Cookies.get("refresh") || "",
  };
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="App flex flex-row">
        <UserContext.Provider value={context}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </div>
      <span className="text-gray-300 text-sm my-2">
        View the code on{" "}
        <a className="underline" href="https://github.com/wuxxy/auth">
          GitHub
        </a>
      </span>
    </div>
  );
}

export default App;
