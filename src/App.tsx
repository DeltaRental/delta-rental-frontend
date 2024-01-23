import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard/Dashboard';
import Navi from './components/Navi/Navi';
import CartDetail from './pages/Car/CartDetail';


function App() {
  return (
    <div className='App'>
      <Navi />

      <Dashboard />
     
      
    </div>
  );
}

export default App;
