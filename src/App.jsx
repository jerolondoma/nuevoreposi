import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Principal from './components/Principal';
import Home from './components/Home';
import Planes from './components/Planes';
import Clientes from './components/Clientes';
import Login from './components/Login';
import IngresarP from './components/IngresarP';
import Ingreso from './components/Ingreso';
import VerPlanes from './components/VerPlanes';
import Factura from './components/Factura';
import HistorialFacturas from './components/HistorialFacturas';


function App() {


  return <BrowserRouter>
      <Routes>
        <Route path="/IngresarP" element={<IngresarP/>}/>
        <Route path="/HistorialFacturas" element={<HistorialFacturas/>}/>

        <Route path="/Ingreso" element={<Ingreso/>}/>
        <Route path="/Principal" element={<Principal/>}/>
        <Route path="/Ingreso/Principal" element={<Principal/>}/>
        <Route path="/VerPlanes" element={<VerPlanes/>}/>
        <Route path="/Factura/:planid" element={<Factura />} /> {/* Ruta para Factura */}


        <Route index path='/' element={<Home/>}/>
        <Route path='/planes' element={<Planes/>}/>
        <Route path='/clientes' element={<Clientes/>}/>
        <Route path='/logins' element={<Login/>}/>
      </Routes>
  </BrowserRouter>


}

export default App
