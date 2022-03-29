import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import Details from "./components/Details";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Homepage />} />
        <Route exact path="/home/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
