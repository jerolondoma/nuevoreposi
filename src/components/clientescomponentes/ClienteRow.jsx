    const ClienteRow =({cliente,onEdit,onDelete}) =>{

        const handleEdit = () => {
            onEdit(cliente);
        };

        const handleDelete = () => {
            onDelete(cliente.clienteID);
        };

        return (
            <tr>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellido}</td>
                <td>{cliente.email}</td>
                <td>{cliente.fecharegistro}</td>
                <td>{cliente.fechavencimiento}</td>

                <td>
                    <button onClick={handleEdit}>Actualizar</button>
                    <button onClick={handleDelete}>Eliminar</button>
                </td>
            </tr>
        );
    }

    export default ClienteRow;