const PlanRow = ({plane,onEdit,onDelete}) => {

    const handleEdit = () => {
        onEdit(plane);
    };

    const handleDelete = () => {
        onDelete(plane.planID);
    };
        

    return (
        <tr>
            <td>{plane.nombreplan}</td>
            <td>{plane.duracion}</td>
            <td>{plane.descripcion}</td>
            <td>{plane.precio}</td>

            <td>
                <button onClick={handleEdit}>Actualizar</button>
                <button onClick={handleDelete}>Eliminar</button>
            </td>
        </tr>
    )
}

export default PlanRow;