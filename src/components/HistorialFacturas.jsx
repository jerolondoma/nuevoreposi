import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/HistorialFacturas.css"; // Importamos el archivo CSS específico

const images = [
  '/images/imagen10.jpg',
];

function HistorialFacturas() {
  const [facturas, setFacturas] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  // Obtener la lista de facturas
  useEffect(() => {
    fetchFacturas();

    // Configurar el carrusel de imágenes
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchFacturas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/factura/historial");
      setFacturas(response.data);
    } catch (error) {
      console.log("Error al consultar facturas: ", error);
    }
  };

  return (
    <div className="historial-facturas-container">
      {/* Carrusel de imágenes */}
      <div className="historial-facturas-carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`historial-facturas-carousel-image ${
              index === currentImage ? "historial-facturas-active" : ""
            }`}
          />
        ))}
      </div>

      {/* Encabezado */}
      <header className="historial-facturas-header">
        <div className="historial-facturas-logo-title">
          <Link to="/Principal">
            <img
              src="/images/logo.png"
              alt="Logo Gimnasio Atlhon"
              className="historial-facturas-logo-image"
              width="70px"
              height="70px"
            />
          </Link>
          <h1 className="historial-facturas-gym-title">Gimnasio Atlhon</h1>
        </div>
        
        <nav className="historial-facturas-nav-menu">
        <Link className="ver-planes-nav-link" to="/HistorialFacturas">Historial Facturas</Link>
          <Link className="historial-facturas-nav-link" to="/VerPlanes">Ver Planes</Link>
          <Link className="historial-facturas-nav-link" to="/planes">Crear Planes</Link>
          <Link className="historial-facturas-nav-link" to="/clientes">Crear Clientes</Link>
          <Link className="historial-facturas-nav-link" to="/">Log Out</Link>
        </nav>
      </header>

      {/* Tabla de facturas */}
      <div className="historial-facturas-content">
        <div className="historial-facturas-table-container">
          <h2>Historial de Facturas</h2>
          <table className="historial-facturas-table">
            <thead>
              <tr>
                <th className="historial-facturas-th">Factura ID</th>
                <th className="historial-facturas-th">Cliente</th>
                <th className="historial-facturas-th">Plan</th>
                <th className="historial-facturas-th">Descripción del Plan</th>
                <th className="historial-facturas-th">Precio</th>
                <th className="historial-facturas-th">Fecha Factura</th>
                <th className="historial-facturas-th">Fecha Vencimiento</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map((factura) => (
                <tr key={factura.facturaID}>
                  <td className="historial-facturas-td">{factura.facturaID}</td>
                  <td className="historial-facturas-td">{factura.nombreCliente}</td>
                  <td className="historial-facturas-td">{factura.nombrePlan}</td>
                  <td className="historial-facturas-td">{factura.descripcionPlan}</td>
                  <td className="historial-facturas-td">{factura.precioF}</td>
                  <td className="historial-facturas-td">{factura.fechaF}</td>
                  <td className="historial-facturas-td">{factura.fechaVencimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="historial-facturas-social-media">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="historial-facturas-social-link"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="historial-facturas-social-link"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="historial-facturas-social-link"
        >
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
}

export default HistorialFacturas;
