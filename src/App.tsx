import './App.css';
// import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard/Dashboard';
import Navi from './components/Navi/Navi';
import CartDetail from './pages/CartDetail';
import CarDetail from './pages/CarDetail';
import Card from './components/Card/Card';

function App() {
  return (
    <div className='App'>
      <Navi />
<<<<<<< HEAD
      {/* <Dashboard /> */}
      <Card/> 
=======
      <Dashboard />
      

>>>>>>> main
    </div>
  );
}

export default App;
