import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import FallbackUI from "./components/FallbackUI";
import NotFound from "./components/NotFound";
import Login from "./pages/Account/Login";
import Register from "./pages/Account/Register";
import Home from "./pages/Home";
function App() {
  return (
    <Suspense fallback={<FallbackUI />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
