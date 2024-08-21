import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/routes/Landing";
import SignInPage from "@/routes/Signin";
import AppFrame from "@/layout/AppFrame";

function App() {
  return (
    <AppFrame>
      <Router>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/signin" Component={SignInPage} />
        </Routes>
      </Router>
    </AppFrame>
  );
}

export default App;
