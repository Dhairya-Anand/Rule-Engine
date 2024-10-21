import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateRule from "./pages/CreateRule";
import EvaluateRule from "./pages/EvaluateRule";
import CombineRule from "./pages/CombineRule";
import Header from "./components/Header";

const App = () =>{
  return(
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/create-rule" element={<CreateRule/>}/>
        <Route path="/evaluate-rule" element={<EvaluateRule/>}/>
        <Route path="/combine-rule" element={<CombineRule/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;