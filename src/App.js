import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SetAvatar from "./pages/SetAvatar";
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/SetAvatar" element={<SetAvatar />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;
