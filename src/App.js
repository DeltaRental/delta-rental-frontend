import './App.css';
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './components/Dashboard/Dashboard';
import Navi from './components/Navi/Navi';

function App() {
  return (
    <div className='App'>
      <Navi />
      <Dashboard />

    </div>
  );
}

export default App;
