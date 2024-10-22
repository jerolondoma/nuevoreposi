import { useState } from "react"

function PlanesForm ({onSubmit}) {

    const [nombreplan,setNombreplan] = useState ('');
    const [duracion,setDuracion] = useState ('');
    const [descripcion,setDescripcion] = useState ('');
    const [precio,setPrecio] = useState ('');

    const handleNombreplanChange = (event) => {
        setNombreplan (event.target.value)
    };
    const handleDuracionChange = (event) => {
        setDuracion (event.target.value)
    };
    const handleDescripcionChange = (event) => {
        setDescripcion (event.target.value)
    };
    const handlePrecioChange = (event) => {
        setPrecio (event.target.value)
    };

    //Funcion para enviar formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit ({nombreplan,duracion,descripcion,precio});
        setNombreplan('');
        setDuracion('');
        setDescripcion('');
        setPrecio('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text"  placeholder="NombrePlan" value={nombreplan} onChange={handleNombreplanChange} required/>
            <input type="text"  placeholder="Duracion" value={duracion} onChange={handleDuracionChange} required/>
            <input type="text"  placeholder="Descripcion" value={descripcion} onChange={handleDescripcionChange} required/>
            <input type="text"  placeholder="Precio" value={precio} onChange={handlePrecioChange} required/>
            <button type="submit"> Guardar </button>
        </form>
    );
}

export default PlanesForm;
