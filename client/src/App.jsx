import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/auth/SignIn";
import SignUp from "./Pages/auth/SignUp";
import PrivateRoutes from "./Routes/PrivateRoutes";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes path="/home" />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        <Route
          path="*"
          element={<h1 className="text-red-500">404 not found</h1>}
        />
        <Route element={<PrivateRoutes path="/sign-up" />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
