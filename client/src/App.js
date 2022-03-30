import Homepage from "./components/Homepage";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import Details from "./components/Details";
import CreateGame from "./components/CreateGame";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Homepage />} />
        <Route exact path="/home/:id" element={<Details />} />
        <Route exact path="/home/form" element={<CreateGame />} />
      </Routes>
    </>
  );
}

export default App;
