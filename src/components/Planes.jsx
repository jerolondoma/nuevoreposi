import axios from "axios";
import { useEffect, useState } from "react";
import PlanTable from "./planescomponentes/PlanTable";
import PlanesForm from "./planescomponentes/PlanesForm";
import { Link } from "react-router-dom";
import "./css/Planes.css"; 

const images = [
  '/images/imagen10.jpg',
];

function Planes() {
    const [planes, setPlanes] = useState([]);
    const [editingPlanes, setEditingPlanes] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);

    //actualizar la lista por cada plan nuevo
    useEffect(() => {
        fetchPlanes();

        // Carrusel de imágenes
        const interval = setInterval(() => {
            setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    //recorrer y retornar planes
    const fetchPlanes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/planes');
            setPlanes(response.data);
        } catch (error) {
            console.log('Error a consultar planes: ', error);
        }
    }
    //crear actualizar planes
    const handleCreateOrUpdatePlane = async (planeData) => {
        if (editingPlanes) {
            await axios.put(`http://localhost:8080/api/planes/${editingPlanes.planID}`, planeData)
        } else {
            await axios.post(`http://localhost:8080/api/planes`, planeData)
        }
        fetchPlanes();
        setEditingPlanes(null);
    };

    //editar planes
    const handleEditPlane = (plane) => {
        setEditingPlanes(plane);
    };

    //eliminar cliente a partir id 
    const handleDeletePlane = async (planID) => {
        await axios.delete(`http://localhost:8080/api/planes/${planID}`);
        fetchPlanes();
    };

    return (
        <div className="planes-container">
            
            <div className="planes-carousel">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Slide ${index}`}
                        className={`planes-carousel-image ${index === currentImage ? "planes-active" : ""}`}
                    />
                ))}
            </div>

            
            <header className="planes-header">
                <div className="planes-logo-title">
                    <Link to="/Principal">
                        <img
                            src="/images/logo.png"
                            alt="Logo Gimnasio Atlhon"
                            className="planes-logo-image"
                        />
                    </Link>
                    <h1 className="planes-gym-title">Gimnasio Atlhon</h1>
                </div>
                
                <nav className="planes-nav-menu">
                <Link className="ver-planes-nav-link" to="/HistorialFacturas">Historial Facturas</Link>
                    <Link to="/VerPlanes" className="principal-nav-link">Ver Planes</Link>
                    <Link className="planes-nav-link" to="/planes">Crear Planes</Link>
                    <Link className="planes-nav-link" to="/clientes">Crear Clientes</Link>
                    <Link className="planes-nav-link" to="/">Log Out</Link>
                </nav>
            </header>

           
            <div className="planes-content">
                <div className="planes-table-container">
                    <h2>Lista de Planes</h2>
                    <PlanTable planes={planes} onEdit={handleEditPlane} onDelete={handleDeletePlane} />
                </div>
                <div className="planes-form-container">
                    <h3>{editingPlanes ? "Editar Plan" : "Crear Plan"}</h3>
                    <PlanesForm onSubmit={handleCreateOrUpdatePlane} initialPlane={editingPlanes} />
                </div>
            </div>

       
            <div className="planes-social-media">
                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="planes-social-link"
                >
                    <i className="fab fa-instagram"></i>
                </a>
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="planes-social-link"
                >
                    <i className="fab fa-facebook"></i>
                </a>
                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="planes-social-link"
                >
                    <i className="fab fa-twitter"></i>
                </a>
            </div>
        </div>
    );
}

export default Planes;
