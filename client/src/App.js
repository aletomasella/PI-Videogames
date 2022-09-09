import './App.css';
import Landing from "./Pages/Landing/Landing"
import Main from './Pages/Main/Main';
import { Route } from "react-router-dom"

function App() {
  return (
    <>
      <Route path="/" component={Landing} exact />
      <Route path="/main" component={Main} />
    </>
  );
}

export default App;