import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./css/VerPlanes.css"; 

const images = [
  
 '/images/imagen10.jpg',
];

function VerPlanes() {
  const [planes, setPlanes] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  // Obtener la lista de planes
  useEffect(() => {
    fetchPlanes();

    // Configurar el carrusel de imágenes
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchPlanes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/planes");
      setPlanes(response.data);
    } catch (error) {
      console.log("Error al consultar planes: ", error);
    }
  };

  // Función para manejar el clic en el botón "Facturar"
  const handleFacturar = (planid) => {
    navigate(`/factura/${planid}`); // Redirigir a la página de factura con el planid
  };

  return (
    <div className="ver-planes-container">
     
      <div className="ver-planes-carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`ver-planes-carousel-image ${
              index === currentImage ? "ver-planes-active" : ""
            }`}
          />
        ))}
      </div>

    
      <header className="ver-planes-header">
        <div className="ver-planes-logo-title">
          <Link to="/Principal">
            <img
              src="/images/logo.png"
              alt="Logo Gimnasio Atlhon"
              className="ver-planes-logo-image"
              width="70px"
              height="70px"
            />
          </Link>
          <h1 className="ver-planes-gym-title">Gimnasio Atlhon</h1>
        </div>
       
        <nav className="ver-planes-nav-menu">
        <Link className="ver-planes-nav-link" to="/HistorialFacturas">Historial Facturas</Link>
          <Link className="ver-planes-nav-link" to="/VerPlanes">Ver Planes</Link>
          <Link className="ver-planes-nav-link" to="/planes">Crear Planes</Link>
          <Link className="ver-planes-nav-link" to="/clientes">Crear Clientes</Link>
          <Link className="ver-planes-nav-link" to="/">Log Out</Link>
        </nav>
      </header>

     
      <div className="ver-planes-content">
        <div className="ver-planes-table-container">
          <h2>Lista de Planes</h2>
          <table className="ver-planes-table">
            <thead>
              <tr>
                <th className="ver-planes-th">Nombreplan</th>
                <th className="ver-planes-th">Duracion</th>
                <th className="ver-planes-th">Descripcion</th>
                <th className="ver-planes-th">Precio</th>
                <th className="ver-planes-th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {planes.map((plane) => (
                <tr key={plane.planid}>
                  <td className="ver-planes-td">{plane.nombreplan}</td>
                  <td className="ver-planes-td">{plane.duracion}</td>
                  <td className="ver-planes-td">{plane.descripcion}</td>
                  <td className="ver-planes-td">{plane.precio}</td>
                  <td className="ver-planes-td">
                  <td className="ver-planes-td">
  <Link
    to={`/Factura/${plane.planID}`}
    className="ver-planes-row-button"
  >
    Facturar
  </Link>
</td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    
      <div className="ver-planes-social-media">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ver-planes-social-link"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ver-planes-social-link"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="ver-planes-social-link"
        >
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
}

export default VerPlanes;
