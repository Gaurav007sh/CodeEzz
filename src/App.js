import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // wrap the whole app into the browser Router
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home";
import Edit from "./Pages/Edit";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route 
            path="/editor/:roomID" 
            element={<Edit />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;