import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import './home.css'; // Importa el archivo CSS específico para Home


const images = [
 
  '/images/imagen10.jpg',

];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container34">
      
      <div className="home-carousel34">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`home-carousel-image34 ${index === currentImage ? 'home-active34' : ''}`}
          />
        ))}
      </div>

   
      <header className="home-header34">
       
        <div className="home-logo-title34">
          <div >
          <Link to="/" ><img src='/images/logo.png' alt="Logo Gimnasio Atlhon" className="home-logo-image34" width="70px" height="70px"/></Link>
          </div>
          <h1 className="home-gym-title34">Gimnasio Atlhon</h1>
        </div>
       
        <nav className="home-nav-menu34">
          <Link to="/logins" className="home-nav-link34">Registro</Link>
          <Link to="/Ingreso" className="home-nav-link34">Ingreso</Link>
        </nav>
      </header>

      
      <div className="home-content34">
        <div>
          <p className="home-content-subtitle34">EL PODER DE LOS CAMBIOS</p>
          <h2 className="home-content-title34">Gimnasio Atlhon Lo mejor Para tu Cuerpo</h2>
        </div>
      </div>

      
      <div className="home-social-media34">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="home-social-link34">
          <FaInstagram size={32} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="home-social-link34">
          <FaFacebook size={32} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="home-social-link34">
          <FaTwitter size={32} />
        </a>
      </div>
    </div>
  );
};

export default Home;
