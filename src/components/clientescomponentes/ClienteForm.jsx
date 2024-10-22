import { useState } from "react";

function ClienteForm ({onSubmit}) {
    
    const [nombre,setNombre] =useState('');
    const [apellido,setApellido] =useState('');
    const [email,setEmail] =useState('');
    const [fecharegistro,setFecharegistro] =useState('');
    const [fechavencimiento,setFechavencimiento] = useState ('');

    const handleNombreChange = (event) =>{
        setNombre(event.target.value);
    }

    const handleApellidoChange = (event) =>{
        setApellido(event.target.value);
    }

    const handleEmailChange = (event) =>{
        setEmail(event.target.value);
    }

    const handleFechaRegistroChange = (event) =>{
        setFecharegistro(event.target.value);
    }

    const handleFechaVencimineto = (event) =>{
        setFechavencimiento(event.target.value);
    }


    const handleSubmit =(event) =>{
        event.preventDefault();
        onSubmit({nombre,apellido,email,fecharegistro,fechavencimiento})
        setNombre('');
        setApellido('');
        setEmail('');
        setFecharegistro('');
        setFechavencimiento('');

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="nombre" value={nombre} onChange={handleNombreChange} required/>
            <input type="text" placeholder="apellido" value={apellido} onChange={handleApellidoChange} required/>
            <input type="email" placeholder="email" value={email} onChange={handleEmailChange} required/>
            <input type="text" placeholder="fecha de registro" value={fecharegistro} onChange={handleFechaRegistroChange} required/>
            <input type="text" placeholder="fecha de vencimiento" value={fechavencimiento} onChange={handleFechaVencimineto} required/>
            <button type="submit">Guardar </button>
        </form>
    );
}

export default ClienteForm;