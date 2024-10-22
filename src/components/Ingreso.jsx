import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Para hacer las solicitudes al backend
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Para redirigir después del login
import './ingreso.css'; // Importar el archivo CSS

const images = [
'/images/imagen10.jpg',
];

const Ingreso = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Para mostrar errores de validación
  const navigate = useNavigate(); // Hook para redireccionar

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/logins/validate', {
        nombreusuario: username,
        password: password,
      });

      if (response.data.success) {
        navigate('/Principal'); // Redirigir al usuario a la página principal después del login
      } else {
        setError(response.data.message); // Mostrar el error si las credenciales no son correctas
      }
    } catch (error) {
      setError('Hubo un problema con el servidor. Intenta más tarde.');
    }
  };

  return (
    <div className="ingreso-container89">
      <div className="ingreso-carousel89">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`ingreso-carousel-image89 ${index === currentImage ? 'ingreso-active89' : ''}`}
          />
        ))}
      </div>

      <header className="ingreso-header89">
        <div className="ingreso-logo-title89">
          <img src="/images/logo.png" alt="Logo Gimnasio Atlhon" className="ingreso-logo-image89" />
          <h1 className="ingreso-gym-title89">Gimnasio Atlhon</h1>
        </div>

        <nav className="ingreso-nav-menu89">
          <a href="/logins" className="ingreso-nav-link89">Registro</a>
          <a href="/Ingreso" className="ingreso-nav-link89">Ingreso</a>
        </nav>
      </header>

      <div className="ingreso-content89">
        <form onSubmit={handleSubmit} className="ingreso-form89">
          <h2 className="ingreso-form-title89">Ingreso al Gimnasio</h2>
          {error && <p className="ingreso-error89">{error}</p>} {/* Mostrar mensaje de error si existe */}
          <div className="ingreso-input-group89">
            <label htmlFor="username" className="ingreso-label89">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              className="ingreso-input89"
            />
          </div>
          <div className="ingreso-input-group89">
            <label htmlFor="password" className="ingreso-label89">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="ingreso-input89"
            />
          </div>
          <button type="submit" className="ingreso-button89">Enviar</button>
        </form>
      </div>

      <div className="ingreso-social-media89">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="ingreso-social-link89">
          <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="ingreso-social-link89">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="ingreso-social-link89">
          <FaTwitter />
        </a>
      </div>
    </div>
  );
};

export default Ingreso;
