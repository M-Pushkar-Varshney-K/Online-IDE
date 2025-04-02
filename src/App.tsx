import MainEditor from "./Pages/MainEditor";
import { Navigate, Route, Routes, BrowserRouter as Router  } from "react-router-dom";
import Login from "./auth/pages/Login";
import SignUp from "./auth/pages/SignUp";
import Headers from "./components/Header";
import Dashboard from "./Pages/Dasboard";

function App() {

  return (
    <div>
      <Headers/>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dash" />} />

        <Route path="/dash" element={<Dashboard/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/editor" element={<MainEditor />} />

        {/* Network error */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
