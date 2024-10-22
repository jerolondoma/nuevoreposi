import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginsTable from "./logincomponentes/LoginsTable";
import LoginsForm from "./logincomponentes/LoginsForm";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import "./Login.css"; // Importa el archivo CSS nuevo para el login

const images = [
'/images/imagen10.jpg',
];

const Login = () => {
  const [logins, setLogins] = useState([]);
  const [editingLogin, setEditingLogin] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    fetchLogins();

    // Cambiar la imagen de fondo automáticamente cada 6 segundos
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const fetchLogins = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/logins");
      setLogins(response.data);
    } catch (error) {
      console.log("Error al cargar logins: ", error);
    }
  };

  const handleCreateOrUpdateLogins = async (loginData) => {
    if (editingLogin) {
      await axios.put(`http://localhost:8080/api/logins/${editingLogin.usuarioID}`, loginData);
    } else {
      await axios.post("http://localhost:8080/api/logins", loginData);
    }
    fetchLogins();
    setEditingLogin(null);
  };

  const handleEditLogin = (login) => {
    setEditingLogin(login);
  };

  const handleDeleteLogin = async (usuarioID) => {
    try {
      await axios.delete(`http://localhost:8080/api/logins/${usuarioID}`);
      fetchLogins();
    } catch (error) {
      console.log("Error al eliminar login: ", error);
    }
  };

  return (
    <div className="login-container">
     
      <div className="login-carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`login-carousel-image ${index === currentImage ? "login-active" : ""}`}
          />
        ))}
      </div>

      
      <header className="login-header">
        <div className="login-logo-title">
        <Link to="/" ><img
            src="/images/logo.png"
            alt="Logo Gimnasio Atlhon"
            className="login-logo-image"
            width="50px"
            height="50px"
          /></Link>
          <h1 className="login-gym-title">Gimnasio Atlhon</h1>
        </div>
        <nav className="login-nav-menu">
          <Link to="/logins" className="login-nav-link">
            Registro
          </Link>
          <Link to="/Ingreso" className="login-nav-link">
            Ingreso
          </Link>
        </nav>
      </header>

  
      <div className="login-content">
       
        <div className="login-table-container">
          <h1 className="login-title">Logins</h1>
          <h2 className="login-subtitle">Lista de Usuarios</h2>
          <LoginsTable logins={logins} onEdit={handleEditLogin} onDelete={handleDeleteLogin} />
        </div>

     
        <div className="login-form-container">
          <h3 className="login-form-title">
            {editingLogin ? "Editar login" : "Crear login"}
          </h3>
          <LoginsForm onSubmit={handleCreateOrUpdateLogins} initialLogin={editingLogin} />
        </div>
      </div>

   
      <div className="login-social-media">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="login-social-link"
        >
          <FaInstagram size={32} />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="login-social-link"
        >
          <FaFacebook size={32} />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="login-social-link"
        >
          <FaTwitter size={32} />
        </a>
      </div>
    </div>
  );
};

export default Login;
