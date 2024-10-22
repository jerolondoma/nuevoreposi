import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./css/Factura.css"; 

const images = [
'/images/imagen10.jpg',
];

function Factura() {
  const { planid } = useParams(); 
  const [currentImage, setCurrentImage] = useState(0);
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [factura, setFactura] = useState({ preciof: "" });
  const [plan, setPlan] = useState(null); 
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchClientes(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/planes/${planid}`);
        setPlan(response.data); 
      } catch (error) {
        console.log("Error al obtener el plan: ", error);
      }
    };
    fetchPlan();
  }, [planid]);

  const searchClientes = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/clientes?search=${query}`);
      setClientes(response.data);
    } catch (error) {
      console.log("Error al buscar clientes: ", error);
    }
  };

  const handleSelectCliente = (cliente) => {
    setSelectedCliente(cliente);
    setClientes([]); 
    setShowForm(false); 
    console.log('Cliente seleccionado:', cliente); 
  };

  const handleFacturaChange = (e) => {
    const { name, value } = e.target;
    setFactura((prevFactura) => ({
      ...prevFactura,
      [name]: value,
    }));
  };

  // Función para sumar meses y ajustar el año si es necesario
  const sumarMeses = (fecha, meses) => {
    let fechaInicial = new Date(fecha);
    let dia = fechaInicial.getDate();
    
    // Sumar los meses directamente, lo que manejará automáticamente el cambio de año
    fechaInicial.setMonth(fechaInicial.getMonth() + 3);

    // Si el día ha cambiado después de ajustar el mes (por ejemplo, pasando de un 31 a un mes con 30 días)
    if (fechaInicial.getDate() < dia) {
        // Ajustar al último día del mes anterior
        fechaInicial.setDate(0);
    }

    return fechaInicial;
};



  const handleCobrar = () => {
    setShowForm(true); 
  };

  const handleSubmitFactura = async (e) => {
    e.preventDefault(); 

    try {
      // Capturamos la fecha del input que tiene la fecha de la factura y la fecha de vencimiento
      const fechaActualInput = e.target.fechaf.value;
      const fechaf_VencimientoInput = e.target.fechaf_Vencimiento.value;

      console.log('Datos a enviar:', {
        fechaf: fechaActualInput, // Fecha obtenida del input (fecha de la factura)
        fechaf_Vencimiento: fechaf_VencimientoInput, // Fecha de vencimiento obtenida del input
        preciof: factura.preciof || (plan && plan.precio), // Precio de la factura
        clienteID: { clienteID: selectedCliente.clienteID }, // Cliente seleccionado
        planID: { planID: planid }, // Plan seleccionado
      });

      // Enviamos los datos al backend
      await axios.post("http://localhost:8080/api/factura", {
        fechaf: fechaActualInput, // Fecha de la factura capturada del input
        fechaf_Vencimiento: fechaf_VencimientoInput, // Fecha de vencimiento capturada del input
        preciof: factura.preciof || (plan && plan.precio), // Precio de la factura
        clienteID: { clienteID: selectedCliente.clienteID }, // Cliente seleccionado
        planID: { planID: planid }, // Plan seleccionado
      });
      alert("Factura registrada exitosamente");
    } catch (error) {
      console.log("Error al registrar la factura: ", error);
    }
  };

  return (
    <div className="factura-container">
      <div className="factura-carousel">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`factura-carousel-image ${
              index === currentImage ? "factura-active" : ""
            }`}
          />
        ))}
      </div>

      <header className="factura-header">
        <div className="factura-logo-title">
          <Link to="/Principal">
            <img
              src="/images/logo.png"
              alt="Logo Gimnasio Atlhon"
              className="factura-logo-image"
              width="70px"
              height="70px"
            />
          </Link>
          <h1 className="factura-gym-title">Gimnasio Atlhon</h1>
        </div>
        <nav className="factura-nav-menu">
        <Link className="ver-planes-nav-link" to="/HistorialFacturas">Historial Facturas</Link>
          <Link className="factura-nav-link" to="/VerPlanes">
            Ver Planes
          </Link>
          <Link className="factura-nav-link" to="/planes">
            Crear Planes
          </Link>
          <Link className="factura-nav-link" to="/clientes">
            Crear Clientes
          </Link>
          <Link className="factura-nav-link" to="/">
            Log Out
          </Link>
        </nav>
      </header>

      <div className="factura-content">
        <h2>Crear Factura</h2>

        <div className="factura-search-container">
          <label>Buscar Cliente:</label>
          <input
            type="text"
            className="factura-search-input"
            placeholder="Ingrese nombre o apellido"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {clientes.length > 0 && (
            <ul className="factura-search-results">
              {clientes.map((cliente) => (
                <li
                  key={cliente.clienteid}
                  className="factura-search-item"
                  onClick={() => handleSelectCliente(cliente)}
                >
                  {cliente.nombre} {cliente.apellido} - {cliente.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedCliente && (
          <div className="factura-cliente-info">
            <h3>Cliente Seleccionado:</h3>
            <p>
              <strong>Nombre:</strong> {selectedCliente.nombre}
            </p>
            <p>
              <strong>Apellido:</strong> {selectedCliente.apellido}
            </p>
            <p>
              <strong>Email:</strong> {selectedCliente.email}
            </p>
            <button className="factura-cobrar-button" onClick={handleCobrar}>
              Cobrar
            </button>
          </div>
        )}

        {showForm && selectedCliente && plan && (
          <div className="factura-form-container">
            <h3>Registrar Factura</h3>
            <form onSubmit={handleSubmitFactura}>
              <input
                type="text"
                name="clienteid_clienteid"
                value={selectedCliente.nombre}
                readOnly
                className="factura-input"
              />
              <input
                type="text"
                name="planid_planid"
                value={plan.nombreplan} 
                readOnly
                className="factura-input"
              />
              <input
                type="date"
                name="fechaf"
                value={new Date().toISOString().split("T")[0]} // Fecha actual
                readOnly
                className="factura-input"
              />
              <input
                type="date"
                name="fechaf_Vencimiento"
                value={sumarMeses(new Date(), plan.duracion).toISOString().split("T")[0]} // Fecha de vencimiento
                readOnly
                className="factura-input"
              />
              <input
                type="number"
                name="preciof"
                value={factura.preciof || plan.precio} 
                onChange={handleFacturaChange}
                required
                className="factura-input"
              />
              <button type="submit" className="factura-submit-button">
                Registrar Factura
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="factura-social-media">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="factura-social-link"
        >
          <i className="fab fa-instagram"></i>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="factura-social-link"
        >
          <i className="fab fa-facebook"></i>
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="factura-social-link"
        >
          <i className="fab fa-twitter"></i>
        </a>
      </div>
    </div>
  );
}

export default Factura;
