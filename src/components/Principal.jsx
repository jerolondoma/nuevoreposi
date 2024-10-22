import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import './principal.css'; // Importa el archivo CSS específico para Principal

const images = [
    
    "/images/imagen10.jpg",
    "/images/imagen7.jpg",
];

const Principal = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="principal-container">
      
      <div className="principal-carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`principal-carousel-image ${index === currentImage ? 'principal-active' : ''}`}
          />
        ))}
      </div>

     
      <header className="principal-header">
       
        <div className="principal-logo-title">
          <div>
            <img src='/images/logo.png' alt="Logo Gimnasio Atlhon" className="principal-logo-image" width="70px" height="70px" />
          </div>
          <h1 className="principal-gym-title">Gimnasio Atlhon</h1>
        </div>
        
        <nav className="principal-nav-menu">
        <Link className="ver-planes-nav-link" to="/HistorialFacturas">Historial Facturas</Link>
          <Link to="/VerPlanes" className="principal-nav-link">Ver Planes</Link>
          <Link to="/planes" className="principal-nav-link">Crear Planes</Link>
          <Link to="/clientes" className="principal-nav-link">Crear Clientes</Link>
          <Link to="/" className="principal-nav-link">Log Out</Link>
        </nav>
      </header>

      
      <div className="principal-content">
        <h2 className="principal-content-title">Bienvenido al Sistema de Gestión del Gimnasio</h2>
      </div>

    
      <div className="principal-social-media">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="principal-social-link">
          <FaInstagram size={32} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="principal-social-link">
          <FaFacebook size={32} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="principal-social-link">
          <FaTwitter size={32} />
        </a>
      </div>
    </div>
  );
};

export default Principal;
