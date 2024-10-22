import { useEffect, useState } from "react";
import axios from "axios";
import ClienteTable from "./clientescomponentes/ClienteTable";
import ClienteForm from "./clientescomponentes/ClienteForm";
import "./css/Clientes.css"; 
import { Link } from "react-router-dom";

const images = [
 
  "/images/imagen10.jpg",

];

function Clientes() {
  const [cliente, setCliente] = useState([]);
  const [editingCliente, SetEditingCliente] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  // Actualizar clientes
  useEffect(() => {
    fetchCliente();

    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Recorrer y retornar clientes
  const fetchCliente = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/clientes");
      setCliente(response.data);
    } catch (error) {
      console.log("Error a cargar clientes: ", error);
    }
  };

  // Crear o actualizar cliente
  const CreateorUpdateCliente = async (clienteData) => {
    if (editingCliente) {
      await axios.put(
        `http://localhost:8080/api/clientes/${editingCliente.clienteID}`,
        clienteData
      );
    } else {
      await axios.post(`http://localhost:8080/api/clientes`, clienteData);
    }
    fetchCliente();
    SetEditingCliente(null);
  };

  // Editar cliente
  const handleEditCliente = (cliente) => {
    SetEditingCliente(cliente);
  };

  // Eliminar cliente
  const handleDeleteCliente = async (clienteID) => {
    try {
      await axios.delete(`http://localhost:8080/api/clientes/${clienteID}`);
      fetchCliente();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
      alert("Error al eliminar el cliente.");
    }
  };

  return (
    <div className="clientes-container">
      <div className="clientes-carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`clientes-carousel-image ${
              index === currentImage ? "clientes-active" : ""
            }`}
          />
        ))}
      </div>


      <header className="clientes-header">
        <div className="clientes-logo-title">
          <div>
          <Link to="/Principal">
            <img
              src="/images/logo.png"
              alt="Logo Gimnasio Atlhon"
              className="clientes-logo-image"
              width="70px"
              height="70px"
            />
            </Link>
          </div>
          <h1 className="clientes-gym-title">Gimnasio Atlhon</h1>
          
        </div>
 
        <nav className="clientes-nav-menu">
        <Link className="ver-planes-nav-link" to="/HistorialFacturas">Historial Facturas</Link>
          <Link className="clientes-nav-link" to="/VerPlanes">
            Ver Planes
          </Link>
          <Link className="clientes-nav-link" to="/planes">
            Crear Planes
          </Link>
          <Link className="clientes-nav-link" to="/clientes">
            Crear Clientes
          </Link>
          <Link className="clientes-nav-link" to="/">
            Log Out
          </Link>
        </nav>
      </header>


      <div className="clientes-content">
        <div className="clientes-table-container">
          <h2>Lista de Usuarios</h2>
          <ClienteTable
            clientes={cliente}
            onEdit={handleEditCliente}
            onDelete={handleDeleteCliente}
          />
        </div>
        <div className="clientes-form-container">
          <h3>{editingCliente ? "Editar Cliente" : "Crear Cliente"}</h3>
          <ClienteForm
            onSubmit={CreateorUpdateCliente}
            initialCliente={editingCliente}
          />
        </div>
      </div>

 
      <div className="clientes-social-media">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="clientes-social-link"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="clientes-social-link"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="clientes-social-link"
        >
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
}

export default Clientes;
