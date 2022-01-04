import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from './componentes/LandingPage'
import Home from './componentes/Home';
import Detail from './componentes/Detail'
import CreateActivity from './componentes/CreateActivity';
//import DetailCountry from './components/DetailCountry/DetailCountry';
function App() {
  return (
    <BrowserRouter>
    
      <div className="App">
        <Routes>

          <Route exact path= "/" element= {<LandingPage/>}/>
          <Route path= "/home" element= {<Home/>}/>
          <Route path= "/home/:id" element= {<Detail/>}/> 
         <Route path= "/activity" element= {<CreateActivity/>}/>
          

        </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
