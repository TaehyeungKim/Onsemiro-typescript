import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "@/routes/Landing";
import SignInPage from "@/routes/Signin";
import SignUpPage from "@/routes/Signup";
import AppFrame from "@/layout/AppFrame";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <AppFrame>
        <Router>
          <Routes>
            <Route path="/" Component={LandingPage} />
            <Route path="/signin" Component={SignInPage} />
            <Route path="/signup" Component={SignUpPage} />
          </Routes>
        </Router>
      </AppFrame>
    </RecoilRoot>
  );
}

export default App;
