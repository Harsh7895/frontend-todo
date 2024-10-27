import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import PrivateRoute from "./components/PrivateRoute";
import Task from "./pages/Task";
function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/task/:taskId" element={<Task />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/setting" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
