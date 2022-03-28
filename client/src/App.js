import "./App.css";
import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
