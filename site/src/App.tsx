import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Interface from "./Interface";
import Login from "./Login";
import Register from "./Register";
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
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="App flex flex-row">
        <RouterProvider router={router} />
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
