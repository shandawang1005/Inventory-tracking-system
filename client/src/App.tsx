
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@components/Dashboard";
// import Login from "@components/Login";
import NavBar from "@components/Navbar";

const App = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  return (
    <Router>
      <NavBar user={user} onAuth={setUser} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
